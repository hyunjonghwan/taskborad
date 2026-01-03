const now = new Date();

const daysFromNow = (days) => {
  const date = new Date(now);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const mockTasks = [
  {
    id: "TB-1024",
    title: "클러스터 노드 점검 스케줄 수립",
    description: "월간 점검 일정 및 담당자 배정",
    status: "todo",
    priority: "high",
    owner: "김지원",
    dueDate: daysFromNow(3),
    createdAt: daysFromNow(-7),
    updatedAt: daysFromNow(-1),
  },
  {
    id: "TB-1025",
    title: "보안 패치 적용 결과 보고",
    description: "주요 취약점 조치 내역 정리",
    status: "in-progress",
    priority: "medium",
    owner: "박지후",
    dueDate: daysFromNow(5),
    createdAt: daysFromNow(-6),
    updatedAt: daysFromNow(-0),
  },
  {
    id: "TB-1026",
    title: "오토스케일링 정책 리뷰",
    description: "피크 트래픽 대응 전략 검토",
    status: "blocked",
    priority: "high",
    owner: "이서연",
    dueDate: daysFromNow(7),
    createdAt: daysFromNow(-4),
    updatedAt: daysFromNow(-2),
  },
  {
    id: "TB-1027",
    title: "클러스터 백업 자동화",
    description: "주간 백업 정책 및 알림 설정",
    status: "done",
    priority: "low",
    owner: "정민수",
    dueDate: daysFromNow(-1),
    createdAt: daysFromNow(-10),
    updatedAt: daysFromNow(-1),
  },
  {
    id: "TB-1028",
    title: "새 워커 노드 온보딩",
    description: "노드 구성 템플릿 반영",
    status: "in-progress",
    priority: "medium",
    owner: "최하늘",
    dueDate: daysFromNow(10),
    createdAt: daysFromNow(-2),
    updatedAt: daysFromNow(-1),
  },
];

let tasks = [...mockTasks];

export const taskRepository = {
  getTasks: async () => tasks,
  updateTask: async (id, payload) => {
    tasks = tasks.map((task) =>
      task.id === id
        ? { ...task, ...payload, updatedAt: new Date().toISOString() }
        : task
    );
    return tasks.find((task) => task.id === id);
  },
  deleteTask: async (id) => {
    tasks = tasks.filter((task) => task.id !== id);
  },
};
