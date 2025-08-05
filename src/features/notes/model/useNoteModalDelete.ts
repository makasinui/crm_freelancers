import type { Note } from '@/entities/note';
import { useState } from 'react';

export const useNoteModalDelete = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState<Note | null>();

    const openModal = (note?: Note) => {
        setIsOpen(true);
        setNote(note)
    };

    const closeModal = () => {
        setIsOpen(false);
        setNote(null)
    };

    return {
        isOpen,
        note,
        openModal,
        closeModal
    };
};
