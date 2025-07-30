import type { Task } from '@/entities/task';
import { useState } from 'react';

export const useTaskModalDelete = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState<Task | null>();


    const openModal = (task?: Task) => {
        setIsOpen(true);
        setTask(task)
    };

    const closeModal = () => {
        setIsOpen(false);
        setTask(null);
    };

    return {
        isOpen,
        task,
        openModal,
        closeModal
    };
};
