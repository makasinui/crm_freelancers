import type { Dayjs } from 'dayjs';
import styles from './DatePicker.module.scss';
import Input from '../input';
import { useEffect, useRef, useState } from 'react';
import Calendar from '../calendar';
import { useClickOutside } from '@/shared/lib';

interface DatePickerProps {
    value?: Dayjs | null;
    onChange: (date: Dayjs) => void;
    position?: 'top' | 'bottom';
}

export default function DatePicker({ value, position = 'top', onChange }: DatePickerProps) {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (value) {
            setInputValue(value.format('YYYY-MM-DD'));
        }
    }, [value]);

    useClickOutside(dropdownRef, () => setIsOpen(false));

    const handleChange = (val: Dayjs) => {
        onChange(val);
    };

    return (
        <div className={styles.datePicker}>
            <Input
                value={inputValue}
                readonly
                label="Choose date"
                onClick={() => setIsOpen(true)}
            />
            {isOpen && (
                <div
                    className={`${styles.datePicker__wrapper} ${`${styles.datePicker__wrapper}--${position}`}`}
                    ref={dropdownRef}
                >
                    <Calendar
                        value={value}
                        onChange={handleChange}
                        onClose={() => setIsOpen(false)}
                    />
                </div>
            )}
        </div>
    );
}
