import { supabaseServer } from "@/lib/supabase";
import { NextResponse } from "next/server";


export async function GET() {
    const {data, error} = await supabaseServer.from("tasks")
    .select("id, title, description, status, priority, created_at")
    .order("created_at", {ascending: false});

    if(error){
        console.error("GET /api/tasks", error);
        return NextResponse.json(
            {error: "Failed to fetch tasks"}, {status: 500})
    }
    return NextResponse.json({data}, {status: 200})
};

export async function POST(req) {
    const body = await req.json();
    const {title, description, status, priority} = body;

if (!title || typeof title !== "string") {
    return NextResponse.json(
      { error: "title is required" },
      { status: 400 }
    );
  }

  const {data, error} = await supabaseServer
  .from("tasks")
  .insert({
    title,
    description: description ?? '',
    status: status ?? 'todo',
    priority: priority ?? 'medium',
  })
  .select("id, title, description, status, priority, createed_at")
  .single();

  if(error){
     console.error("POST /api/tasks error:", error);
     return NextResponse.json(
        {error: 'Failed to create task'},
        {status: 500}
     )
  }
  return NextResponse.json({data}, {status: 201})

};