import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { useCalendar } from './model/useCalendar';
import styles from './Calendar.module.scss';
import { MdArrowLeft, MdArrowRight } from 'react-icons/md';

interface CalendarProps {
    value: Dayjs | null;
    onChange: (date: Dayjs) => void;
}

export default function Calendar({ value, onChange }: CalendarProps) {
    const {
        daysOfTheWeek,
        daysGrid,
        isCurrentDay,
        isInactiveDay,
        isSelectedDay,
        setSelectedDate,
        setSelectedDay,
        title,
        setPrevMonth,
        setNextMonth,
    } = useCalendar(value, onChange);

    useEffect(() => {
        if (value) {
            setSelectedDate(dayjs(value));
        }
    }, [value, setSelectedDate]);

    return (
        <div className={styles.calendar}>
            <div className={styles.calendar__header}>
                <div className={styles.calendar__headerLeft}>{title()}</div>

                <div className={styles.calendar__headerRight}>
                    <button
                        className={`${styles.calendar__headerButton} ${styles.calendar__headerButton_prev}`}
                        onClick={setPrevMonth}
                    >
                        <MdArrowLeft />
                    </button>
                    <button
                        className={`${styles.calendar__headerButton} ${styles.calendar__headerButton_next}`}
                        onClick={setNextMonth}
                    >
                        <MdArrowRight />
                    </button>
                </div>
            </div>

            <div className={styles.calendar__daysWeek}>
                {daysOfTheWeek.map((day) => (
                    <div
                        key={day}
                        className={styles.calendar__dayWeek}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className={styles.calendar__daysMonth}>
                {daysGrid.map((day) => (
                    <div
                        key={day.valueOf()}
                        className={`
              ${styles.calendar__dayMonth}
              ${isCurrentDay(day) ? styles.calendar__dayMonth_current : ''}
              ${isSelectedDay(day) ? styles.calendar__dayMonth_active : ''}
              ${isInactiveDay(day) ? styles.calendar__dayMonth_inactive : ''}
            `}
                        onClick={() => !isInactiveDay(day) && setSelectedDay(day)}
                    >
                        {day.format('D')}
                    </div>
                ))}
            </div>
        </div>
    );
}
