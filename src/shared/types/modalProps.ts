import type { ZodObject } from "zod";

export interface EditableModal<T> {
    isOpen: boolean;
    title: string;
    form: T;
    validationSchema: ZodObject;
    setForm: (val: T) => void;
    onClose: () => void;
    onSubmit: () => void;
}