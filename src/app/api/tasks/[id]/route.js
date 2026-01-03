import { getSupabaseServer } from "@/lib/supabase";
import { NextResponse } from "next/server";

const getSupabaseClient = () => {
  const { client, error } = getSupabaseServer();
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  return client;
};

export async function PATCH(req, { params }) {
  const supabaseServer = getSupabaseClient();
  if (supabaseServer instanceof NextResponse) {
    return supabaseServer;
  }

  const { id } = params;
  const body = await req.json();
  const { title, description, status, priority } = body;

  const { data, error } = await supabaseServer
    .from("tasks")
    .update({
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(status !== undefined && { status }),
      ...(priority !== undefined && { priority }),
    })
    .eq("id", id)
    .select("id, title, description, status, priority, created_at")
    .single();

  if (error) {
    console.error("PATCH ERROR", error);
    return NextResponse.json({ error: "Failed to Update" }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(req, { params }) {
  const supabaseServer = getSupabaseClient();
  if (supabaseServer instanceof NextResponse) {
    return supabaseServer;
  }

  const { id } = params;
  const { error } = await supabaseServer.from("tasks").delete().eq("id", id);

  if (error) {
    console.error("DELETE ERROR", error);
    return NextResponse.json(
      { error: "Failed DELETE", details: error },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
