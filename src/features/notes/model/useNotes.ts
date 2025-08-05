import { useAppDispatch, useAppSelector } from "@/app/store"
import { addNote, deleteNote, editNote } from "@/entities/note"
import type { Note } from "@/entities/note";
import type { FormType } from "./useNoteModal";
import dayjs from "dayjs";

export const useNotes = () => {
    const dispatch = useAppDispatch();
    const notes = useAppSelector((state) => state.notes);

    const handleAddNote = (note: FormType) => {
        const newNote: Note = {
            ...note,
            id: Date.now().toString(),
            createdAt: dayjs()
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