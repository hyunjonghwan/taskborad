import { http } from "@/shared/lib/http";

export async function fetchTasks() {
  const res = await http.get("/tasks");
  return res.data.data;
}

export async function createTask(payload) {
  const res = await http.post("/tasks", payload);
  return res.data.data;
}

export async function updateTask({ id, data }) {
  const res = await http.patch(`/tasks/${id}`, data);

  return res.data.data;
}

export async function deleteTask({ id }) {
  await http.delete(`/tasks/${id}`);
}
