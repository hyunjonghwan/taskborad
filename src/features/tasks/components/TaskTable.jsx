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
    <div>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>상태</th>
            <th>우선순위</th>
            <th>생성일</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => {
              const editing = isEditing(task);
              return (
                <tr key={task.id}>
                  <td>
                    <div>
                      {editing ? (
                        <input
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
                        <span>{task.title}</span>
                      )}
                    </div>
                  </td>

                  {/* 상태 */}
                  <td>
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
