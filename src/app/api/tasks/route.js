import { taskService } from "@/_core/task";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await taskService.getTasks();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("GET /api/tasks", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req) {
  return NextResponse.json(
    { error: "Mock API에서는 생성 기능을 지원하지 않습니다." },
    { status: 400 }
  );
}
