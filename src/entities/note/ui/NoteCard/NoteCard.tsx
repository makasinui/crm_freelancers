import { MdDelete, MdEdit } from "react-icons/md";
import type { Note } from "../../model/types";
import styles from './NoteCard.module.scss';
import { formatDate } from "@/shared/lib";

interface NoteCardProps {
    note: Note
    onDelete?: (note: Note) => void;
    onEdit?: (note: Note) => void;
}

export default function NoteCard({ note, onDelete, onEdit }: NoteCardProps) {
    const getRandomColor = () => {
        const allColors = ['green', 'yellow', 'red'];

        const num = Math.floor(Math.random() * 3);
        const color = allColors[num];

        return 'bg-main-' + color;
    }

    const handleEdit = () => {
        onEdit?.(note);
    }

    const handleDelete = () => {
        onDelete?.(note);
    }

    return (
        <div className={`${styles.noteCard} ${getRandomColor()}`}>
            <h3 className={styles.noteCard__title}>{note.title}</h3>
            <p className={styles.noteCard__content}>{note.content}</p>
            <span className={styles.noteCard__date}>{formatDate(note.createdAt)}</span>
            <div className={styles.noteCard__actions}>
                <MdEdit onClick={handleEdit} />
                <MdDelete onClick={handleDelete} />
            </div>
        </div>
    )
}