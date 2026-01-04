import dayjs from "dayjs";

export const statusLabels = {
  todo: "대기",
  "in-progress": "진행 중",
  blocked: "보류",
  done: "완료",
};

export const statusVariants = {
  todo: "default",
  "in-progress": "info",
  blocked: "warning",
  done: "success",
};

export const priorityLabels = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

export const priorityVariants = {
  low: "default",
  medium: "info",
  high: "warning",
};

export function formatTaskDate(value) {
  if (!value) return "-";
  return dayjs(value).format("YYYY-MM-DD");
}
