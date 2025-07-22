import taskReducer, { addTask, editTask, deleteTask } from './model/slice';
import { TaskCard } from './ui/TaskCard';

export {
    taskReducer,
    addTask,
    editTask,
    deleteTask,
    TaskCard
}

export * from './model/types';