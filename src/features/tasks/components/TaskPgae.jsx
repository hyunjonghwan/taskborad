"use client";
import { useTasks } from "../hooks/useTasks";
import { TaskTable } from "./TaskTable";

export function TaskPage() {
  const {
    tasks,
    isLoading,
    isError,
    error,
    totalCount,
    filterdCount,
    deleteTask,
    deletePending,
    updateTask,
    updatePending,
  } = useTasks();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 ">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">작업 목록</h2>
          <p className="text-xs text-slate-500">
            Supabase + React Query + JS 버전
          </p>
        </div>

        <div className="flex item-center gap-3 text-xs text-slate-500">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 ">
            전체
            <span className="font-semibold text-slate-800">{totalCount}건</span>
          </span>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1">
            필터
            <spa className="font-semibold text-blue-700">{filterdCount}건</spa>
          </span>
        </div>
      </div>

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
    </div>
  );
}
