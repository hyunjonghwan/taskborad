"use client";
import { useTasks } from "../hooks/useTasks";
import { TaskTable } from "./TaskTable";

export function TaskPage() {
  const {
    tasks,
    isLoading,
    isError,
    error,
    deleteTask,
    deletePending,
    updateTask,
    updatePending,
  } = useTasks();

  return (
    <TaskTable
      tasks={tasks}
      isLoading={isLoading}
      isError={isError}
      error={error}
      onDelete={deleteTask}
      deletePending={deletePending}
      onUpdate={updateTask}
      updatePending={updatePending}
    />
  );
}
