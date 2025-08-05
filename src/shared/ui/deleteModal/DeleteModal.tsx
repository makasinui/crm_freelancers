import { Modal } from '@/shared';

interface DeleteModalProps {
    entityTitle?: string;
    modalTitle: string
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export default function DeleteModal({ modalTitle, entityTitle, isOpen, onClose, onDelete }: DeleteModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onDelete}
            title={`Deleting ${modalTitle}`}
            isShowSubmit
            submitText="Delete"
        >
            Do you really want to delete {entityTitle}?
        </Modal>
    );
}
