import styles from './TaskModal.module.scss';

import { TaskStatus, type Task } from '@/entities/task';
import { Dropdown, Input, Modal } from '@/shared';
import { firstCharToUpperCase } from '@/shared/lib';
import type { DropdownOption } from '@/shared/types';
import z, { ZodAny, ZodString } from 'zod';

type FormType = Omit<Task, 'id'>;
interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    form: FormType;
    setForm: (val: FormType) => void;
    validationSchema: { [K in keyof FormType]: ZodString };
}

export default function TaskModal({ isOpen, title, form, validationSchema, onClose, setForm }: TaskModalProps) {
    const handleChangeForm = (value: string, key: keyof FormType) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const taskStatuses: DropdownOption[] = Object.values(TaskStatus).map((item) => ({
        label: firstCharToUpperCase(item),
        value: item,
    }));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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
