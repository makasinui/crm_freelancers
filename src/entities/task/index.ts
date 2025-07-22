import taskReducer, { addTask, editTask, deleteTask } from './model/slice';
import { TaskCard } from './ui/TaskCard';
import { TaskList } from './ui/TaskList';

export {
    taskReducer,
    addTask,
    editTask,
    deleteTask,
    TaskCard,
    TaskList
}

export * from './model/types';