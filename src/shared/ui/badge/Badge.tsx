import type { ColorType } from '@/shared/types';
import styles from './Badge.module.scss';

interface BadgeProps {
    status: string
    color?: ColorType
}

export default function Badge({ status, color = 'blue' }: BadgeProps) {

    return (
        <div className={`${styles.badge} bg-main-${color}`}>
            {status}
        </div>
    )
}