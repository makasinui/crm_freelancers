import type { Task } from '@/entities/task';
import { useState } from 'react';
import z from 'zod';

export type FormType = Omit<Task, 'id'> & {
    id?: string
};

export const useTaskModal = () => {
    const baseForm: FormType = {
        title: '',
        description: '',
        status: 'active',
    }

    const [type, setType] = useState<'create' | 'update'>('create');
    const [form, setForm] = useState<FormType>({...baseForm});

    const validationSchema = z.object({
        title: z.string().trim().min(1).max(30),
        description: z.string().trim().max(150),
        status: z.string().min(1)
    });;

    const [isOpen, setIsOpen] = useState(false);

    const title = type === 'create' ? 'Create Task' : 'Update Task';

    const openModal = (type?: 'create' | 'update', task?: Task) => {
        setType(type ?? 'create');
        setIsOpen(true);
        if(task?.id) {
            setForm({...task});
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setForm({...baseForm})
    };

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
