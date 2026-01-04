import { taskListSchema, taskSchema } from "../entities/taskSchema";
import { taskRepository } from "../repositories/taskRepository";

export const taskService = {
  getTasks: async () => {
    const tasks = await taskRepository.getTasks();
    return taskListSchema.parse(tasks);
  },
  getTask: async (id) => {
    const task = await taskRepository.getTask(id);
    if (!task) return null;
    return taskSchema.parse(task);
  },
  updateTask: async (id, payload) => {
    const task = await taskRepository.updateTask(id, payload);
    return taskSchema.parse(task);
  },
  deleteTask: async (id) => {
    await taskRepository.deleteTask(id);
  },
};
