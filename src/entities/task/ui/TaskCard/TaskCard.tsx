import { formatDate } from '@/shared/lib';
import type { Task } from '../../model/types';
import styles from './TaskCard.module.scss';

interface TaskCardProps {
    task: Task;
    onEdit?: (task: Task) => void;
    onDelete?: (id: string) => void;
}

export default function TaskCard({ task }: TaskCardProps) {
    return (
        <section className={styles.task}>
            <h3>{task.title}</h3>
            {task?.endDate && <div className={styles.task__end}>
                <span>Due date: {formatDate(task.endDate, 'MMMM DD, YYYY')}</span>
            </div>}
            
        </section>
    );
}
