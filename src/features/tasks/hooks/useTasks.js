"use client";

import { useTaskFilterStore } from "@/store/taskFilterStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, fetchTasks, updateTask } from "../api";

export function useTasks() {
  const { status, priority, search } = useTaskFilterStore();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data) => updateTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const filterdTasks =
    (data || []).filter((task) => {
      if (status !== "all" && task.status !== status) return false;
      if (priority !== "all" && task.priority !== priority) return false;
      if (search.trim()) {
        const term = search.trim().toLowerCase();
        if (!task.title.toLowerCase().includes(term)) return false;
      }

      return true;
    }) || [];

  return {
    tasks: filterdTasks,
    isLoading,
    isError,
    error,
    totalCount: data?.length || 0,
    filterdCount: filterdTasks.length || 0,
    deleteTask: (id) => deleteMutation(id),
    deletePending: deleteMutation.isPending,
    updateTask: ({ id, title, priority }) =>
      updateMutation({
        id,
        data: { title, priority },
      }),
    updatePending: updateMutation.isPending,
  };
}
