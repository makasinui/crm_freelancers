import type { Note } from '../../model/types';
import NoteCard from '../NoteCard/NoteCard';
import styles from './NoteList.module.scss';

interface NoteListProps {
    notes?: Note[];
    onDelete?: (note: Note) => void;
    onEdit?: (note: Note) => void;
}

export default function NoteList({ notes, onDelete, onEdit }: NoteListProps) {
    return (
        <div className={styles.noteList}>
            {notes?.map((note) => (
                <NoteCard
                    onDelete={onDelete}
                    onEdit={onEdit}
                    note={note}
                    key={note.id}
                />
            ))}
        </div>
    );
}
