import type { Task } from '@/entities/task';
import { useState } from 'react';
import z from 'zod';

export const useTaskModal = () => {
    const [type, setType] = useState<'create' | 'update'>('create');
    const [form, setForm] = useState<Omit<Task, 'id'>>({
        title: '',
        description: '',
        status: 'active',
    });

    const validationSchema = {
        title: z.string().min(1).max(30),
        description: z.string().max(150),
        status: z.string().min(1)
    }

    const [isOpen, setIsOpen] = useState(false);

    const title = type === 'create' ? 'Create Task' : 'Update Task';

    const openModal = (type?: 'create' | 'update') => {
        setType(type ?? 'create');
        setIsOpen(true);
    };

    const closeModal = () => setIsOpen(false);

    return {
        form,
        setForm,
        isOpen,
        title,
        openModal,
        closeModal,
        validationSchema
    };
};
