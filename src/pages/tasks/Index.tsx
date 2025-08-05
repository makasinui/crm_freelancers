import { TaskList, type Task } from '@/entities/task';
import { useTaskModal, useTasks, TaskModal, useTaskModalDelete } from '@/features/tasks';
import { Button, DeleteModal } from '@/shared';

export default function TasksPages() {
    const { tasks, dragStart, drop, addTask, editTask, deleteTask } = useTasks();
    const { 
        openModal, 
        closeModal, 
        isOpen, 
        title, 
        form, 
        setForm, 
        validationSchema 
    } = useTaskModal();

    const { 
        task, 
        isOpen: isOpenDeleteModal, 
        openModal: openDeleteModal, 
        closeModal: closeDeleteModal 
    } = useTaskModalDelete();

    const handleEditTask = (task: Task) => {
        openModal('update', task);
    };

    const handleSubmit = () => {
        if (form?.id) {
            editTask(form as Task);
        } else {
            addTask(form);
        }
    };

    const handleDeleteTask = (task: Task) => {
        openDeleteModal(task);
    }

    const confirmDeleteTask = () => {
        if(!task) {
            return
        }

        deleteTask(task.id);
        closeDeleteModal();
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
                onDelete={handleDeleteTask}
            />
            <DeleteModal 
                entityTitle={task?.title} 
                modalTitle='Task'
                isOpen={isOpenDeleteModal}
                onClose={closeDeleteModal}
                onDelete={confirmDeleteTask}
            />
        </main>
    );
}
