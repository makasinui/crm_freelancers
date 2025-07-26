import taskReducer, { addTask, editTask, deleteTask, dragBetweenColumns } from './model/slice';
import { TaskCard } from './ui/TaskCard';
import { TaskList } from './ui/TaskList';

export {
    taskReducer,
    addTask,
    editTask,
    deleteTask,
    dragBetweenColumns,
    TaskCard,
    TaskList
}

export * from './model/types';