import styles from './Badge.module.scss';

interface BadgeProps {
    status: string
    color: 'red' | 'green' | 'yellow' | 'blue'
}

export default function Badge({ status, color }: BadgeProps) {

    return (
        <div className={`${styles.badge} ${styles[`badge--${color}`]}`}>
            {status}
        </div>
    )
}