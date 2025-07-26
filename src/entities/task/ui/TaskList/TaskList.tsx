import styles from './TaskList.module.scss';
import type { Task } from '../../model/types';
import { TaskCard } from '../TaskCard';

interface TaskListProps {
    tasks?: Task[];
    onDelete?: (id: string) => void;
    onEdit?: (task: Task) => void;
}

export default function TaskList({ tasks, onDelete, onEdit }: TaskListProps) {
    return (
        <div className={styles.task__list}>
            <h2>Tasks</h2>
            <div className={styles['task__list-wrapper']}>
                {tasks?.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
}
