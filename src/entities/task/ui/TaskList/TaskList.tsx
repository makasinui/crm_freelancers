import styles from './TaskList.module.scss';
import { TaskStatus, type Task } from '../../model/types';
import { TaskCard } from '../TaskCard';
import { firstCharToUpperCase } from '@/shared/lib';

interface TaskListProps {
    tasks?: Task[];
    view?: 'list' | 'todo';
    onDelete?: (id: string) => void;
    onEdit?: (task: Task) => void;
}

const TaskWrapperList = ({ tasks, onDelete, onEdit }: TaskListProps) => {
    return (
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
    );
};

const TaskWrapperToDo = ({ tasks, onDelete, onEdit }: TaskListProps) => {
    const getSortedTasks = (status: TaskStatus) => {
        return tasks?.filter((task) => task.status === status);
    };

    const sortedColumn = Object.values(TaskStatus).sort((a, b) => a.localeCompare(b));

    return (
        <div className={styles['task__list-kanban']}>
            {sortedColumn.map((status, i) => (
                <div
                    className={styles['task__list-column']}
                    key={i}
                >
                    {getSortedTasks(status)?.map((task) => (
                        <div key={task.id}>
                            <h3>{firstCharToUpperCase(status)}</h3>
                            <TaskCard
                                key={task.id}
                                task={task}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default function TaskList({ tasks, view = 'todo', onDelete, onEdit }: TaskListProps) {
    return (
        <div className={styles.task__list}>
            {view === 'list' ? (
                <TaskWrapperList
                    tasks={tasks}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ) : (
                <TaskWrapperToDo
                    tasks={tasks}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            )}
        </div>
    );
}
