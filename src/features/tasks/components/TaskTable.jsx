"use client";

import dayjs from "dayjs";
import { Fragment, useState } from "react";

const statusLabels = {
  todo: "대기",
  "in-progress": "진행 중",
  blocked: "보류",
  done: "완료",
};

const statusStyles = {
  todo: "border-slate-200 bg-slate-50 text-slate-600",
  "in-progress": "border-blue-100 bg-blue-50 text-blue-600",
  blocked: "border-amber-100 bg-amber-50 text-amber-700",
  done: "border-emerald-100 bg-emerald-50 text-emerald-700",
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
      <table className="min-w-full border-collapse bg-white">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">작업명</th>
            <th className="px-4 py-3">상태</th>
            <th className="px-4 py-3">우선순위</th>
            <th className="px-4 py-3">담당자</th>
            <th className="px-4 py-3">기한</th>
            <th className="px-4 py-3">업데이트</th>
            <th className="px-4 py-3 text-right">작업</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => {
              const editing = isEditing(task);
              const isOpen = openTaskId === task.id;
              return (
                <Fragment key={task.id}>
                  <tr className="border-t text-sm transition-colors hover:bg-slate-50">
                    <td className="px-4 py-3 align-middle">
                      <div className="flex flex-col gap-1">
                        {editing ? (
                          <input
                            className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                          <button
                            type="button"
                            className="text-left font-medium text-slate-900 hover:text-blue-600"
                            onClick={() =>
                              setOpenTaskId((prev) =>
                                prev === task.id ? null : task.id
                              )
                            }
                            aria-expanded={isOpen}
                          >
                            {task.title}
                          </button>
                        )}
                        <span className="text-xs text-slate-500">
                          ID: {task.id}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 align-middle">
                      {editing ? (
                        <select
                          value={editingTask.status}
                          onChange={(e) =>
                            setEditingTask((prev) => ({
                              ...prev,
                              status: e.target.value,
                            }))
                          }
                          className="rounded-md border border-slate-200 px-2 py-1 text-sm"
                        >
                          <option value="todo">대기</option>
                          <option value="in-progress">진행 중</option>
                          <option value="blocked">보류</option>
                          <option value="done">완료</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold ${
                            statusStyles[task.status]
                          }`}
                        >
                          {statusLabels[task.status]}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 align-middle">
                      {editing ? (
                        <select
                          value={editingTask.priority}
                          onChange={(e) =>
                            setEditingTask((prev) => ({
                              ...prev,
                              priority: e.target.value,
                            }))
                          }
                          className="rounded-md border border-slate-200 px-2 py-1 text-sm"
                        >
                          <option value="high">높음</option>
                          <option value="medium">보통</option>
                          <option value="low">낮음</option>
                        </select>
                      ) : (
                        <span>{priorityLabels[task.priority]}</span>
                      )}
                    </td>

                    <td className="px-4 py-3 align-middle text-slate-700">
                      {task.owner}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      {formatDate(task.dueDate)}
                    </td>
                    <td className="px-4 py-3 align-middle text-slate-500">
                      {formatDate(task.updatedAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2 text-xs">
                        {editing ? (
                          <>
                            <button
                              type="button"
                              className="rounded-md border border-blue-200 bg-blue-50 px-2 py-1 font-semibold text-blue-700 disabled:opacity-50"
                              onClick={saveEditing}
                              disabled={updatePending}
                            >
                              저장
                            </button>
                            <button
                              type="button"
                              className="rounded-md border border-slate-200 px-2 py-1 font-semibold text-slate-600"
                              onClick={() => setEditingTask(null)}
                            >
                              취소
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="rounded-md border border-slate-200 px-2 py-1 font-semibold text-slate-600 hover:bg-slate-50"
                              onClick={() => startEditing(task)}
                            >
                              수정
                            </button>
                            <button
                              type="button"
                              className="rounded-md border border-red-200 px-2 py-1 font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                              onClick={() => onDelete(task.id)}
                              disabled={deletePending}
                            >
                              삭제
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                  {isOpen ? (
                    <tr className="border-t bg-slate-50/70 text-sm text-slate-600">
                      <td colSpan={7} className="px-4 py-4">
                        <div className="rounded-md border border-slate-200 bg-white px-4 py-3 shadow-sm">
                          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            작업 상세
                          </div>
                          <div className="mt-3 grid gap-2 text-sm md:grid-cols-3">
                            <div>
                              <span className="text-xs font-semibold text-slate-400">
                                담당자
                              </span>
                              <p className="text-slate-700">{task.owner}</p>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-slate-400">
                                상태
                              </span>
                              <p className="text-slate-700">
                                {statusLabels[task.status]}
                              </p>
                            </div>
                            <div>
                              <span className="text-xs font-semibold text-slate-400">
                                우선순위
                              </span>
                              <p className="text-slate-700">
                                {priorityLabels[task.priority]}
                              </p>
                            </div>
                            <div className="md:col-span-3">
                              <span className="text-xs font-semibold text-slate-400">
                                설명
                              </span>
                              <p className="text-slate-700">{task.description}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })
          ) : (
            <tr>
              <td
                className="px-4 py-8 text-center text-sm text-slate-500"
                colSpan={7}
              >
                아직 등록된 작업이 없습니다. 상단의 &quot;새 작업 추가&quot;
                버튼으로 첫 작업을 만들어보세요.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
