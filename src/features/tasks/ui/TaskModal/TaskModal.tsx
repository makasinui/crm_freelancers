import styles from './TaskModal.module.scss';

import { TaskStatus } from '@/entities/task';
import { DatePicker, Dropdown, Input, Modal } from '@/shared';
import { firstCharToUpperCase } from '@/shared/lib';
import type { DropdownOption, EditableModal } from '@/shared/types';
import z from 'zod';
import type { FormType } from '../../model/useTaskModal';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';

interface ErrorsType {
    title: string[] | null;
    description: string[] | null;
    status: string[] | null;
}

export default function TaskModal({ 
    isOpen, 
    title, 
    form, 
    validationSchema, 
    onClose, 
    onSubmit, 
    setForm 
}: EditableModal<FormType>) {
    const [errors, setErrors] = useState<ErrorsType>({
        title: null,
        description: null,
        status: null,
    });

    const handleChangeForm = (value: string | Dayjs, key: keyof FormType) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const taskStatuses: DropdownOption[] = Object.values(TaskStatus).map((item) => ({
        label: firstCharToUpperCase(item),
        value: item,
    }));

    const handleSubmit = () => {
        const result = validationSchema.safeParse(form);
        if (!result.success) {
            const { properties } = z.treeifyError(result.error);

            if (!properties) {
                return;
            }

            setErrors({
                title: properties?.title?.errors ?? null,
                description: properties?.description?.errors ?? null,
                status: properties?.status?.errors ?? null,
            });

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
            onClose={onClose}
            onSubmit={handleSubmit}
            title={title}
            isShowSubmit
        >
            <form className={styles['task__modal-wrapper']}>
                <Input
                    value={form.title}
                    onChange={(val) => handleChangeForm(val, 'title')}
                    label="Task title"
                    validationSchema={validationSchema.shape.title}
                    onValidationError={(val) => handleSetError(val, 'title')}
                    externalError={errors.title}
                />
                <Input
                    value={form.description as string}
                    onChange={(val) => handleChangeForm(val, 'description')}
                    label="Task description"
                    validationSchema={validationSchema.shape.description}
                    onValidationError={(val) => handleSetError(val, 'description')}
                    externalError={errors.description}
                />
                <DatePicker
                    value={form.endDate}
                    position="top"
                    onChange={(val) => handleChangeForm(val, 'endDate')}
                />
                <Dropdown
                    label="Task status"
                    options={taskStatuses}
                    value={form.status}
                    onChange={(e) => handleChangeForm(e, 'status')}
                    validationSchema={validationSchema.shape.status}
                    onValidationError={(val) => handleSetError(val, 'status')}
                    externalError={errors.status}
                />
            </form>
        </Modal>
    );
}
