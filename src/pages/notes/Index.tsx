import { NoteList } from '@/entities/note';
import { NoteModal, useNoteModal, useNotes } from '@/features/notes';
import { Button } from '@/shared';

export default function NotesPage() {
    const { notes, addNote, editNote, deleteNote } = useNotes();
    const { isOpen, title, form, setForm, validationSchema, openModal, closeModal } = useNoteModal();

    const handleSubmit = () => {
        addNote(form);
    }

    return (
        <section>
            <Button onClick={openModal}>Add note</Button>
            <NoteList
                notes={notes}
                onEdit={editNote}
            />
            <NoteModal
                isOpen={isOpen}
                onClose={closeModal}
                title={title}
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            />
        </section>
    );
}
