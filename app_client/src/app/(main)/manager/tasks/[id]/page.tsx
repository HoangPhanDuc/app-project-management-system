import { Suspense } from "react";
import TaskList from "@/components/tasks/TaskList";
import Loading from "@/components/utils/Loading";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <Suspense fallback={<Loading />}>
      <TaskList projectId={id} />
    </Suspense>
  );
}
