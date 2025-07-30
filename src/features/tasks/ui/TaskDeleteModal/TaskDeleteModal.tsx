import { Modal } from '@/shared';

interface TaskDeleteModalProps {
    taskTitle?: string;
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export default function TaskDeleteModal({ taskTitle, isOpen, onClose, onDelete }: TaskDeleteModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onDelete}
            title="Deleting task"
            isShowSubmit
            submitText="Delete"
        >
            Do you really want to delete task {taskTitle}?
        </Modal>
    );
}
