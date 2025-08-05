import type { FormType } from '../../model/useNoteModal';
import type { EditableModal, ErrorsType } from '@/shared/types';
import { Input, Modal } from '@/shared';
import { useZod } from '@/shared/lib';

import styles from './NoteModal.module.scss';
import { useState } from 'react';

export default function NoteModal({ 
    isOpen, 
    title, 
    form, 
    validationSchema, 
    setForm, 
    onClose, 
    onSubmit 
}: EditableModal<FormType>) {
    const [errors, setErrors] = useState<ErrorsType<FormType>>({
        title: null,
        content: null,
    });

    const { handleCheckErrors } = useZod<FormType>();

    const handleChangeForm = (value: string, key: keyof FormType) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const handleSubmit = () => {
        const result = validationSchema.safeParse(form);
        const err = handleCheckErrors(result);
        if (err) {
            setErrors(err);
            return;
        }
        onSubmit();
        onClose();
    };

    const handleSetError = (error: string[] | null, key: keyof FormType) => {
        setErrors((err) => ({
            ...err,
            [key]: error,
        }));
    };

    return (
        <Modal
            isOpen={isOpen}
            title={title}
            onClose={onClose}
            onSubmit={handleSubmit}
            isShowSubmit
        >
            <form className={styles.noteForm}>
                <Input
                    value={form.title}
                    onChange={(val) => handleChangeForm(val, 'title')}
                    label="Note title"
                    validationSchema={validationSchema.shape.title}
                    onValidationError={(val) => handleSetError(val, 'title')}
                    externalError={errors.title}
                />
                <Input
                    value={form.content as string}
                    onChange={(val) => handleChangeForm(val, 'content')}
                    label="Note content"
                    validationSchema={validationSchema.shape.content}
                    onValidationError={(val) => handleSetError(val, 'content')}
                    externalError={errors.content}
                />
            </form>
        </Modal>
    );
}
