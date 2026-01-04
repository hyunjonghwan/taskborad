"use client";

import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTask } from "@/features/view-task/hooks/useTask";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";

const statusLabels = {
  todo: "대기",
  "in-progress": "진행 중",
  blocked: "보류",
  done: "완료",
};

const statusVariants = {
  todo: "default",
  "in-progress": "info",
  blocked: "warning",
  done: "success",
};

const priorityVariants = {
  low: "default",
  medium: "info",
  high: "warning",
};

const priorityLabels = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

function formatDate(value) {
  if (!value) return "-";
  return dayjs(value).format("YYYY-MM-DD");
}

export function TaskDetailPage({ taskId }) {
  const router = useRouter();
  const { task, isLoading, isError, error } = useTask(taskId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white py-10 text-sm text-slate-500">
        작업 상세 정보를 불러오는 중입니다...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <p>작업 상세 정보를 불러오는 중 에러가 발생했습니다.</p>
        <p className="text-xs">{error?.message}</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-6 text-sm text-slate-500">
        선택한 작업을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Task detail
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">{task.title}</h2>
          <p className="text-sm text-slate-500">
            작업 상세 정보와 진행 상황을 확인합니다.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => router.push("/tasks")}
        >
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              설명
            </div>
            <p className="mt-2 text-sm text-slate-700">{task.description}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              일정 정보
            </div>
            <div className="mt-3 grid gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">생성일</span>
                <span className="text-slate-700">{formatDate(task.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">기한</span>
                <span className="text-slate-700">{formatDate(task.dueDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">마지막 업데이트</span>
                <span className="text-slate-700">{formatDate(task.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              기본 정보
            </div>
            <div className="mt-3 grid gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">담당자</span>
                <span className="text-slate-700">{task.owner}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">상태</span>
                <Badge variant={statusVariants[task.status]}>
                  {statusLabels[task.status]}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">우선순위</span>
                <Badge variant={priorityVariants[task.priority]}>
                  {priorityLabels[task.priority]}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">작업 ID</span>
                <span className="text-slate-700">{task.id}</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              참고
            </div>
            <p className="mt-2 text-sm text-slate-600">
              우측 드로어의 상세보기 아이콘을 클릭해 확인한 작업의 상세 페이지입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
