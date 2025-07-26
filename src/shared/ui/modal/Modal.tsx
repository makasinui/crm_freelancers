import type { ReactNode } from 'react';
import styles from './Modal.module.scss';
import { Button } from '../button';
import { MdClose } from 'react-icons/md';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: () => void;
    title: string;
    children: ReactNode;
    isShowSubmit?: boolean;
    submitText?: string;
    closeText?: string;
}

export default function Modal({ 
    isOpen,
    title,
    children,
    submitText,
    closeText,
    isShowSubmit = false,
    onClose,
    onSubmit
}: ModalProps) {
    return isOpen ? (
        <article
            className={styles.modal}
            role="dialog"
        >
            <div className={styles.modal__wrapper}>
                <header className={styles.modal__header}>
                    <h3 className={styles['modal__header-title']}>{title}</h3>
                    <MdClose
                        className={styles['modal__header-icon']}
                        onClick={onClose}
                    />
                </header>
                <div className={styles.modal__content}>{children}</div>
                <footer className={styles.modal__footer}>
                    <Button type='tertiary' onClick={onClose}>{closeText ?? 'Close'}</Button>
                    {isShowSubmit ? <Button onClick={onSubmit}>{submitText ?? 'Submit'}</Button> : null}
                </footer>
            </div>
        </article>
    ) : null;
}
