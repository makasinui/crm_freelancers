import { useAppDispatch, useAppSelector } from "@/app/store"
import { addTask, deleteTask, editTask, type Task } from "@/entities/task"

export const useTasks = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks);

    const handleAddTask = (task: Omit<Task, 'id'>) => {
        const newTask: Task = {
            ...task,
            id: Date.now().toString()
        }

        dispatch(addTask(newTask));
    }

    const handleEditTask = (task: Task) => {
        dispatch(editTask(task));
    }

    const handleDeleteTask = (id: string) => {
        dispatch(deleteTask(id));
    }
    
    return {
        tasks,
        addTask: handleAddTask,
        editTask: handleEditTask,
        deleteTask: handleDeleteTask
    }
}