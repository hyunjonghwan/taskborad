"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchTask } from "@/_core/task/repositories/taskApi";

export function useTask(taskId) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => fetchTask(taskId),
    enabled: Boolean(taskId),
  });

  return {
    task: data,
    isLoading,
    isError,
    error,
  };
}
