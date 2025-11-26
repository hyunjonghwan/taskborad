"use client";

import { useState } from "react";

const dayjs = require("dayjs");

function formatDate(value) {
  if (!value) return "";
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center rounded-lg border bg-white py-10 text-sm text-slate-500">
        작업 목록을 불러오는 중입니다...
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <span>작업 목록을 불러오는 중 에러가 발생했습니다.</span>
        <span>{error?.message}</span>
      </div>
    );
  }

  const isEditing = (task) =>
    editingTask && editingTask.id && editingTask.id === task.id;

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="min-w-full border-collapse bg-white">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-4 py-3">제목</th>
            <th className="px-4 py-3">상태</th>
            <th className="px-4 py-3">우선순위</th>
            <th className="px-4 py-3">생성일</th>
            <th className="px-4 py-3 text-right">액션</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => {
              const editing = isEditing(task);
              return (
                <tr
                  key={task.id}
                  className="border-t text-sm transition-colors hover: bg-slate-50"
                >
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
                        <span className="font-medium text-slate-900">
                          {task.title}
                        </span>
                      )}
                      <span className="text-xs text-slate-500">
                        ID: {task.id}
                      </span>
                    </div>
                  </td>

                  {/* 상태 */}
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
                      >
                        <option value="low">낮음</option>
                        <option value="medium">보통</option>
                        <option value="high">높음</option>
                      </select>
                    ) : (
                      <span>{task.priority}</span>
                    )}
                  </td>

                  {/* 생성일 */}
                  <td>{formatDate(task.created_dt || task.createdAt)}</td>

                  {/* 액션 */}
                  <td>
                    <div>
                      {editing ? (
                        <>
                          <button>저장</button>
                          <button>취소</button>
                        </>
                      ) : (
                        <>
                          <button>수정</button>
                          <button>삭제</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                className="px-4 py-8 text-center text-sm text-slate-500"
                colSpan={5}
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
