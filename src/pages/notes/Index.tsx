import { NoteList, type Note } from '@/entities/note';
import { NoteModal, useNoteModal, useNoteModalDelete, useNotes } from '@/features/notes';
import { Button, DeleteModal } from '@/shared';

export default function NotesPage() {
    const { notes, addNote, editNote, deleteNote } = useNotes();
    const { isOpen, title, form, setForm, validationSchema, openModal, closeModal } = useNoteModal();
    const { isOpen: isOpenDeleteModal, closeModal: closeDeleteModal, openModal: openDeleteModal, note } = useNoteModalDelete();

    const handleSubmit = () => {
        if (form?.id) {
            editNote(form as Note);
            return;
        }

        addNote(form);
    };

    const handleEditNote = (note: Note) => {
        openModal('update', note);
    };

    const handleDeleteNote = (note: Note) => {
        openDeleteModal(note);
    };

    const confirmDeleteNote = () => {
        if(!note) {
            return
        }

        deleteNote(note.id);
        closeDeleteModal();
    }

    return (
        <section>
            <Button onClick={openModal}>Add note</Button>
            <NoteList
                notes={notes}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
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
            <DeleteModal
                isOpen={isOpenDeleteModal}
                modalTitle='note'
                entityTitle={note?.title}
                onClose={closeDeleteModal}
                onDelete={confirmDeleteNote}
            />
        </section>
    );
}
