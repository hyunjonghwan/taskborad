"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useTaskFilterStore } from "@/store/taskFilterStore";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";
import { taskFilterSchema } from "../schemas/taskFilterSchema";

const statusOptions = [
  { value: "all", label: "전체" },
  { value: "todo", label: "대기" },
  { value: "in-progress", label: "진행 중" },
  { value: "blocked", label: "보류" },
  { value: "done", label: "완료" },
];

const priorityOptions = [
  { value: "all", label: "전체" },
  { value: "high", label: "높음" },
  { value: "medium", label: "보통" },
  { value: "low", label: "낮음" },
];

export function TaskFilters() {
  const { status, priority, search, setStatus, setPriority, setSearch } =
    useTaskFilterStore();
  const form = useForm({
    resolver: zodResolver(taskFilterSchema),
    defaultValues: {
      search,
      status,
      priority,
    },
  });

  const watchedSearch = useWatch({ control: form.control, name: "search" });
  const watchedStatus = useWatch({ control: form.control, name: "status" });
  const watchedPriority = useWatch({ control: form.control, name: "priority" });

  useEffect(() => {
    setSearch(watchedSearch ?? "");
    setStatus(watchedStatus);
    setPriority(watchedPriority);
  }, [setPriority, setSearch, setStatus, watchedPriority, watchedSearch, watchedStatus]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <form className="flex flex-1 flex-wrap items-center gap-3">
          <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-xs font-semibold text-slate-400">검색</span>
            <Input
              {...form.register("search")}
              className="h-7 border-0 bg-transparent px-0 text-sm text-slate-700 shadow-none focus-visible:ring-0"
              placeholder="작업명 또는 담당자 검색"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">상태</span>
            <Select {...form.register("status")}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">우선순위</span>
            <Select {...form.register("priority")}>
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => form.reset({ search: "", status: "all", priority: "all" })}
          >
            필터 초기화
          </Button>
          <Button type="button" variant="outline" size="sm">
            엑셀 다운로드
          </Button>
          <Button type="button" size="sm">
            새 작업 추가
          </Button>
        </div>
      </div>
    </div>
  );
}
