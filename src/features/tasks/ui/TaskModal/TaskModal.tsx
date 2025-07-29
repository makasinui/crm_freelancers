import styles from './TaskModal.module.scss';

import { TaskStatus } from '@/entities/task';
import { DatePicker, Dropdown, Input, Modal } from '@/shared';
import { firstCharToUpperCase } from '@/shared/lib';
import type { DropdownOption } from '@/shared/types';
import { ZodString } from 'zod';
import type { FormType } from '../../model/useTaskModal';
import type { Dayjs } from 'dayjs';

interface TaskModalProps {
    isOpen: boolean;
    title: string;
    form: FormType;
    validationSchema: { [K in keyof FormType]: ZodString };
    setForm: (val: FormType) => void;
    onClose: () => void;
    onSubmit: () => void;
}

export default function TaskModal({ isOpen, title, form, validationSchema, onClose, onSubmit, setForm }: TaskModalProps) {
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
        onSubmit();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={title}
            isShowSubmit
        >
            <section className={styles['task__modal-wrapper']}>
                <Input
                    value={form.title}
                    onChange={(val) => handleChangeForm(val, 'title')}
                    label="Task title"
                    validationSchema={validationSchema['title']}
                />
                <Input
                    value={form.description as string}
                    onChange={(val) => handleChangeForm(val, 'description')}
                    label="Task description"
                    validationSchema={validationSchema['description']}
                />
                <DatePicker
                    value={form.endDate}
                    onChange={(val) => handleChangeForm(val, 'endDate')}
                />
                <Dropdown
                    label="Task status"
                    options={taskStatuses}
                    value={form.status}
                    onChange={(e) => handleChangeForm(e, 'status')}
                    validationSchema={validationSchema['status']}
                />
            </section>
        </Modal>
    );
}
