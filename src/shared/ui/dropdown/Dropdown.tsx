import { useState, useRef, useCallback } from 'react';
import z, { ZodError, type ZodSchema } from 'zod';
import styles from './Dropdown.module.scss';
import type { DropdownOption } from '@/shared/types';
import { MdArrowDropDown } from 'react-icons/md';
import { useClickOutside } from '@/shared/lib';

interface DropdownProps<T> {
    value: string | null;
    options: DropdownOption[];
    onChange: (value: string) => void;
    label: string;
    validationSchema?: T;
    externalError?: string[] | null;
    onValidationError?: (error: string[] | null) => void;
}

export default function Dropdown<T>({
    value,
    externalError,
    options,
    onChange,
    label,
    validationSchema,
    onValidationError,
}: DropdownProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string[] | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, () => setIsOpen(false));

    const selectedLabel = options.find((opt) => opt.value === value)?.label || '';

    const handleChange = (option: DropdownOption) => {
        onChange(option.value);
        setIsOpen(false);
        validate(option.value);
    };

    const validate = useCallback(
        (value: string) => {
            if (!validationSchema) return;

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
        },
        [validationSchema, onValidationError],
    );

    const shouldFloat = isOpen || !!selectedLabel;

    const visibleError = externalError ?? error;

    return (
        <div
            ref={dropdownRef}
            className={styles['dropdown-wrapper']}
        >
            <div
                className={`${styles.dropdown} ${error ? styles['dropdown--error'] : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={styles['dropdown-selected']}>{selectedLabel}</span>
                <MdArrowDropDown className={`${styles['dropdown-arrow']} ${isOpen ? styles['dropdown-arrow--open'] : ''}`} />
            </div>

            {label && (
                <span
                    className={`${styles['dropdown-label']} ${shouldFloat ? styles['dropdown-label--floating'] : ''} ${
                        error ? styles['dropdown-label--error'] : ''
                    }`}
                >
                    {label}
                </span>
            )}

            {isOpen && (
                <div className={styles['dropdown-options']}>
                    {options.map((option) => (
                        <div
                            key={String(option.value)}
                            className={styles['dropdown-option']}
                            onClick={() => handleChange(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}

            {visibleError && <div className={styles['dropdown-error']}>{visibleError.join(',')}</div>}
        </div>
    );
}
