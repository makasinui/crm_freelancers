import { useAppDispatch, useAppSelector } from "@/app/store"
import { addTask, deleteTask, dragBetweenColumns, editTask, TaskStatus, type Task } from "@/entities/task"
import { useState } from "react";

export const useTasks = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks);

    const [currentDragging, setCurrentDragging] = useState<string>();

    const handleAddTask = (task: Omit<Task, 'id'>) => {
        const newTask: Task = {
            ...task,
            id: Date.now().toString()
        }

        dispatch(addTask(newTask));
    }

    const handleDragStart = (id: string) => {
        const task = tasks?.find(task => task.id === id);
        if(task?.id) {
            setCurrentDragging(task.id);
        }
    }

    const handleDrop = (status: TaskStatus) => {
        if(currentDragging) {
            dispatch(dragBetweenColumns({id: currentDragging, status}))
        }
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
        deleteTask: handleDeleteTask,
        dragStart: handleDragStart,
        drop: handleDrop
    }
}