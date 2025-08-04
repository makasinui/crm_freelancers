import { useAppDispatch, useAppSelector } from "@/app/store"
import { addNote, deleteNote, editNote } from "@/entities/note"
import type { Note } from "@/entities/note";

export const useNotes = () => {
    const dispatch = useAppDispatch();
    const notes = useAppSelector((state) => state.notes);

    const handleAddNote = (note: Omit<Note, 'id'>) => {
        const newNote: Note = {
            ...note,
            id: Date.now().toString()
        }

        dispatch(addNote(newNote));
    }

    const handleEditNote = (Note: Note) => {
        dispatch(editNote(Note));
    }

    const handleDeleteNote = (id: string) => {
        dispatch(deleteNote(id));
    }
    
    return {
        notes,
        addNote: handleAddNote,
        editNote: handleEditNote,
        deleteNote: handleDeleteNote,
    }
}