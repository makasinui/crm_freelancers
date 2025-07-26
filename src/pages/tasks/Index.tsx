import { TaskList } from '@/entities/task';
import { useTaskModal, useTasks, TaskModal } from '@/features/tasks';
import { Button } from '@/shared';

export default function TasksPages() {
    const { tasks, dragStart, drop } = useTasks();
    const { openModal, closeModal, isOpen, title, form, setForm, validationSchema } = useTaskModal();

    return (
        <main>
            <Button onClick={openModal}>Create task</Button>
            <TaskModal
                isOpen={isOpen}
                title={title}
                form={form}
                setForm={setForm}
                onClose={closeModal}
                validationSchema={validationSchema}
            />
            <TaskList
                tasks={tasks}
                onDragStart={dragStart}
                onDrop={drop}
            />
        </main>
    );
}
