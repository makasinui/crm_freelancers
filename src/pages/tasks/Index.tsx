import { TaskList } from "@/entities/task";
import { useTaskModal, useTasks, TaskModal } from "@/features/tasks";
import { Button } from "@/shared";

export default function TasksPages() {
    const { tasks } = useTasks()
    const { openModal, closeModal, isOpen, title, form } = useTaskModal()

    return (
        <main>
            <Button onClick={openModal}>
                Create task
            </Button>
            <TaskModal isOpen={isOpen} title={title} onClose={closeModal} />
            <TaskList tasks={tasks} />
        </main>
    )
}