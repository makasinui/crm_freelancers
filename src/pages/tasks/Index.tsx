import { TaskList } from "@/entities/task";
import { useTasks } from "@/features/tasks";

export default function TasksPages() {
    const { tasks } = useTasks()
    return (
        <div>
            <TaskList tasks={tasks} />
        </div>
    )
}