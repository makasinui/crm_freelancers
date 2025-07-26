import type { Task } from "@/entities/task";
import { useState } from "react";

export const useTaskModal = () => {
    const [type, setType] = useState<'create' | 'update'>('create');
    const form: Omit<Task, 'id'> = {
        title: '',
        description: '',
        status: 'active'
    };

    const [isOpen, setIsOpen] = useState(false);

    const title = type === 'create' ? 'Create Task' : 'Update Task';

    const openModal = (type?: 'create' | 'update') => {
        setType(type ?? 'create');
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    return {
        form,
        isOpen,
        title,
        openModal,
        closeModal
    }
}