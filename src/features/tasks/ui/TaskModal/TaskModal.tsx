import { Modal } from "@/shared";

interface TaskModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
}

export default function TaskModal({ isOpen, onClose, title }: TaskModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            asd
        </Modal>
    )
}