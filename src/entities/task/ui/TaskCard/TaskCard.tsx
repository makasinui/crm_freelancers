import { firstCharToUpperCase, formatDate } from '@/shared/lib';
import type { Task } from '../../model/types';
import styles from './TaskCard.module.scss';
import { Badge } from '@/shared';
import { getTaskStatusColor } from '../../lib/taskStatusColor';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useState, type MouseEvent } from 'react';

interface TaskCardProps {
    task: Task;
    onEdit?: (task: Task) => void;
    onDelete?: (id: string) => void;
    onDragStart?: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onDragStart }: TaskCardProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleEdit = (e: MouseEvent<SVGElement>) => {
        e.stopPropagation();

        if (onEdit) {
            onEdit(task);
        }
    };

    const handleDelete = (e: MouseEvent<SVGElement>) => {
        e.stopPropagation();

        if (onDelete) {
            onDelete(task.id);
        }
    };

    const handleDragStart = () => {
        setIsDragging(true);
        if (onDragStart) {
            onDragStart(task.id);
        }
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    }

    return (
        <section
            className={`${styles.task} ${isDragging ? styles['task--dragging'] : ''}`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <h3 className={styles.task__title}>{task.title}</h3>
            {task?.endDate && (
                <div className={styles.task__end}>
                    <span>Due date: {formatDate(task.endDate, 'MMMM DD, YYYY')}</span>
                </div>
            )}
            <p className={styles.task__description}>{task?.description}</p>
            <div className={styles.task__action}>
                <MdEdit onClick={handleEdit} />
                <MdDelete onClick={handleDelete} />
            </div>
            <div className={styles.task__status}>
                <Badge
                    color={getTaskStatusColor(task.status)}
                    status={firstCharToUpperCase(task.status)}
                />
            </div>
        </section>
    );
}
