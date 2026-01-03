import { taskService } from "@/_core/task";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    const data = await taskService.getTask(id);
    if (!data) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("GET /api/tasks/[id]", error);
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const { title, description, status, priority } = body;

  try {
    const data = await taskService.updateTask(id, {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(status !== undefined && { status }),
      ...(priority !== undefined && { priority }),
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("PATCH ERROR", error);
    return NextResponse.json({ error: "Failed to Update" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await taskService.deleteTask(id);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE ERROR", error);
    return NextResponse.json(
      { error: "Failed DELETE", details: error },
      { status: 500 }
    );
  }
}
