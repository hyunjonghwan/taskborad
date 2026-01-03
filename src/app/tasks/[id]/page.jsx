import { TaskDetailPage } from "@/widgets/ui/TaskDetailPage";

export default async function TaskDetailRoutePage({ params }) {
  const { id } = await params;
  return <TaskDetailPage taskId={id} />;
}
