import styles from './Input.module.scss';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import z, { ZodError, type ZodSchema } from 'zod';

interface InputProps<T> {
    value: string;
    label?: string;
    validationSchema?: T;
    onValidationError?: (error: string[] | null) => void;
    onChange: (e: string) => void;
}

export default function Input<T>({ value, label, validationSchema, onValidationError, onChange }: InputProps<T>) {
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState<string[] | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const shouldFloat = isFocused || !!value;

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleClick = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (validationSchema) {
            try {
                (validationSchema as unknown as ZodSchema).parse(value);
                setError(null);
                onValidationError?.(null);
            } catch (err) {
                const { errors } = z.treeifyError(err as ZodError);
                if (errors?.length) {
                    setError(errors);
                    onValidationError?.(errors);
                }
            }
        }
    }, [value, validationSchema, onValidationError]);

    return (
        <div
            className={styles['input-wrapper']}
            onClick={handleClick}
        >
            <div className={styles['input-wrapper__content']}>
                <input
                    className={styles['input-field']}
                    ref={inputRef}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {label && <span className={`${styles['input-label']} ${shouldFloat ? styles['input-label--floating'] : ''}`}>{label}</span>}
            </div>
            {error?.length ? (
                <div className={styles['input-error__wrapper']}>
                    {error?.map((err) => (
                        <span
                            key={err}
                            className={styles['input-error']}
                        >
                            {err}
                        </span>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
