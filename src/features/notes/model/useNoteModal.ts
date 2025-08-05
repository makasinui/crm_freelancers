import type { Note } from '@/entities/note';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import z from 'zod';

export type FormType = Omit<Note, 'id' | 'createdAt'> & {
    id?: string
    createdAt?: Dayjs
};

export const useNoteModal = () => {
    const baseForm: FormType = {
        title: '',
        content: '',
        createdAt: dayjs()
    }

    const [type, setType] = useState<'create' | 'update'>('create');
    const [form, setForm] = useState<FormType>({...baseForm});

    const validationSchema = z.object({
        title: z.string().trim().min(1).max(30),
        content: z.string().trim().max(100),
    });;

    const [isOpen, setIsOpen] = useState(false);

    const title = type === 'create' ? 'Create Note' : 'Update Note';

    const openModal = (type?: 'create' | 'update', note?: Note) => {
        setType(type ?? 'create');
        setIsOpen(true);
        if(note?.id) {
            setForm({...note});
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
