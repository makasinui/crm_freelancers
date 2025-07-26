import styles from './Button.module.scss';

import type { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    type?: 'primary' | 'secondary' | 'tertiary';
    disabled?: boolean;
    onClick?: () => void;
}

export default function Button({ children, disabled, type = 'primary', onClick }: ButtonProps) {
    const buttonClassName = `${styles.button} ${styles[`button--${type}`]} ${disabled ? styles[`button--${type}_disabled`] : ''}`;

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={buttonClassName}
        >
            {children}
        </button>
    );
}
