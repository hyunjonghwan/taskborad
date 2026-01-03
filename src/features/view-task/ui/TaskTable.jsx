"use client";

import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/Drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table";

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

export function TaskTable({
  tasks,
  isLoading,
  isError,
  error,
  onDelete,
  deletePending,
  onUpdate,
  updatePending,
}) {
  const [editingTask, setEditingTask] = useState(null);
  const [openTaskId, setOpenTaskId] = useState(null);
  const router = useRouter();

  const selectedTask = useMemo(
    () => tasks?.find((task) => task.id === openTaskId) ?? null,
    [openTaskId, tasks]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white py-10 text-sm text-slate-500">
        작업 목록을 불러오는 중입니다...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        <p>작업 목록을 불러오는 중 에러가 발생했습니다.</p>
        <p className="text-xs">{error?.message}</p>
      </div>
    );
  }

  const isEditing = (task) =>
    editingTask && editingTask.id && editingTask.id === task.id;

  const startEditing = (task) =>
    setEditingTask({
      id: task.id,
      title: task.title,
      priority: task.priority,
      status: task.status,
    });

  const saveEditing = () => {
    if (!editingTask?.id) return;
    onUpdate(editingTask);
    setEditingTask(null);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="border-0">
            <TableHead className="px-4">작업명</TableHead>
            <TableHead className="px-4">상태</TableHead>
            <TableHead className="px-4">우선순위</TableHead>
            <TableHead className="px-4">담당자</TableHead>
            <TableHead className="px-4">기한</TableHead>
            <TableHead className="px-4">업데이트</TableHead>
            <TableHead className="px-4 text-right">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => {
              const editing = isEditing(task);
              return (
                <TableRow key={task.id} className="text-sm">
                  <TableCell className="px-4">
                    <div className="flex flex-col gap-1">
                      {editing ? (
                        <Input
                          className="h-8"
                          value={editingTask.title}
                          onChange={(e) =>
                            setEditingTask((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                          placeholder="제목을 입력하세요"
                        />
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto justify-start px-0 text-left text-slate-900 hover:text-blue-600"
                          onClick={() =>
                            setOpenTaskId((prev) =>
                              prev === task.id ? null : task.id
                            )
                          }
                        >
                          {task.title}
                        </Button>
                      )}
                      <span className="text-xs text-slate-500">ID: {task.id}</span>
                    </div>
                  </TableCell>

                  <TableCell className="px-4">
                    {editing ? (
                      <Select
                        value={editingTask.status}
                        onChange={(e) =>
                          setEditingTask((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                        className="h-8"
                      >
                        <option value="todo">대기</option>
                        <option value="in-progress">진행 중</option>
                        <option value="blocked">보류</option>
                        <option value="done">완료</option>
                      </Select>
                    ) : (
                      <Badge variant={statusVariants[task.status]}>
                        {statusLabels[task.status]}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="px-4">
                    {editing ? (
                      <Select
                        value={editingTask.priority}
                        onChange={(e) =>
                          setEditingTask((prev) => ({
                            ...prev,
                            priority: e.target.value,
                          }))
                        }
                        className="h-8"
                      >
                        <option value="high">높음</option>
                        <option value="medium">보통</option>
                        <option value="low">낮음</option>
                      </Select>
                    ) : (
                      <Badge variant={priorityVariants[task.priority]}>
                        {priorityLabels[task.priority]}
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="px-4 text-slate-700">
                    {task.owner}
                  </TableCell>
                  <TableCell className="px-4">
                    {formatDate(task.dueDate)}
                  </TableCell>
                  <TableCell className="px-4 text-slate-500">
                    {formatDate(task.updatedAt)}
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <div className="flex justify-end gap-2 text-xs">
                      {editing ? (
                        <>
                          <Button
                            type="button"
                            size="sm"
                            className="h-7"
                            onClick={saveEditing}
                            disabled={updatePending}
                          >
                            저장
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7"
                            onClick={() => setEditingTask(null)}
                          >
                            취소
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-7"
                            onClick={() => startEditing(task)}
                          >
                            수정
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="h-7"
                            onClick={() => onDelete(task.id)}
                            disabled={deletePending}
                          >
                            삭제
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell
                className="px-4 py-8 text-center text-sm text-slate-500"
                colSpan={7}
              >
                아직 등록된 작업이 없습니다. 상단의 &quot;새 작업 추가&quot;
                버튼으로 첫 작업을 만들어보세요.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Drawer open={Boolean(selectedTask)} onOpenChange={() => setOpenTaskId(null)}>
        <DrawerContent>
          <DrawerHeader>
            <div className="flex items-start justify-between gap-3">
              <div>
                <DrawerTitle>{selectedTask?.title}</DrawerTitle>
                <DrawerDescription>
                  작업 상세 정보를 확인하고 상태를 변경할 수 있습니다.
                </DrawerDescription>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (selectedTask) {
                    router.push(`/tasks/${selectedTask.id}`);
                  }
                }}
                aria-label="상세 페이지로 이동"
              >
                <ArrowUpRight className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setOpenTaskId(null)}
                aria-label="드로어 닫기"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DrawerHeader>
          <DrawerBody className="space-y-4">
            {selectedTask ? (
              <>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    기본 정보
                  </div>
                  <div className="mt-3 grid gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        담당자
                      </span>
                      <span className="text-slate-700">{selectedTask.owner}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        상태
                      </span>
                      <Badge variant={statusVariants[selectedTask.status]}>
                        {statusLabels[selectedTask.status]}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        우선순위
                      </span>
                      <Badge variant={priorityVariants[selectedTask.priority]}>
                        {priorityLabels[selectedTask.priority]}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        기한
                      </span>
                      <span className="text-slate-700">
                        {formatDate(selectedTask.dueDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400">
                        마지막 업데이트
                      </span>
                      <span className="text-slate-700">
                        {formatDate(selectedTask.updatedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    설명
                  </div>
                  <p className="mt-2 text-sm text-slate-700">
                    {selectedTask.description}
                  </p>
                </div>
              </>
            ) : null}
          </DrawerBody>
          <DrawerFooter>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>ID: {selectedTask?.id}</span>
              <Button type="button" variant="outline" size="sm" onClick={() => setOpenTaskId(null)}>
                닫기
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
