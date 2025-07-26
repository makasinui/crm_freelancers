import { TaskList } from "@/entities/task";
import { useTasks } from "@/features/tasks";
import { Button } from "@/shared";

export default function TasksPages() {
    const { tasks } = useTasks()

    return (
        <main>
            <Button>
                Create task
            </Button>
            <TaskList tasks={tasks} />
        </main>
    )
}