import { NoteList } from "@/entities/note";
import { useNotes } from "@/features/notes"

export default function NotesPage() {
    const { notes, addNote, editNote, deleteNote } = useNotes();

    return (
        <NoteList notes={notes} onEdit={editNote} />
    )
}