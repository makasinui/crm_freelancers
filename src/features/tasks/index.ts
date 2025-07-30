import { useTasks } from "./model/useTasks";
import { useTaskModal } from './model/useTaskModal';
import TaskModal from "./ui/TaskModal";
import type { FormType } from "./model/useTaskModal";
import { useTaskModalDelete } from './model/useTaskModalDelete';

export {
    useTasks,
    useTaskModal,
    useTaskModalDelete,
    TaskModal,
    type FormType
}