"use client";

import { useTasks } from "@/entities/task/queries/useTaskList";
import { TaskFilters } from "@/features/filter-task/ui/TaskFilters";
import { TaskTable } from "@/widgets/task-list-table/ui/TaskTable";

export function TaskBoard() {
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
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Taskboard
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">
            작업 목록
          </h2>
          <p className="text-sm text-slate-500">
            클러스터 운영 현황을 기반으로 작업 현황을 관리합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            전체 <span className="font-semibold text-slate-800">{totalCount}</span>
          </span>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1">
            필터
            <span className="font-semibold text-blue-700">{filterdCount}</span>
          </span>
        </div>
      </div>

      <TaskFilters />

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
