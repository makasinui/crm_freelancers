import { TaskList, type Task } from '@/entities/task';
import { useTaskModal, useTasks, TaskModal } from '@/features/tasks';
import { Button } from '@/shared';

export default function TasksPages() {
    const { tasks, dragStart, drop, addTask, editTask } = useTasks();
    const { openModal, closeModal, isOpen, title, form, setForm, validationSchema } = useTaskModal();

    const handleEditTask = (task: Task) => {
        openModal('update', task);
    }
    
    const handleSubmit = () => {
        if(form?.id) {
            editTask(form as Task);
        } else {
            addTask(form);
        }
    }

    return (
        <main>
            <Button onClick={openModal}>Create task</Button>
            <TaskModal
                isOpen={isOpen}
                title={title}
                form={form}
                setForm={setForm}
                validationSchema={validationSchema}
                onClose={closeModal}
                onSubmit={handleSubmit}
            />
            <TaskList
                tasks={tasks}
                onDragStart={dragStart}
                onDrop={drop}
                onEdit={handleEditTask}
            />
        </main>
    );
}
