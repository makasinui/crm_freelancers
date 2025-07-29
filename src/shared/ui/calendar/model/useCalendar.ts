import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

export const useCalendar = (value: Dayjs | null, onChange: (date: Dayjs) => void) => {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(value ? dayjs(value) : null);
    const daysOfTheWeek = [...Array(7)].map(
        (_, index) => dayjs().day(index).format('dd').charAt(0).toUpperCase() + dayjs().day(index).format('dd').slice(1),
    );

    const activeDate = selectedDate || currentDate;
    // Заголовок (Месяц Год)
    const title = () => {
        const month = activeDate.format('MMMM').charAt(0).toUpperCase() + activeDate.format('MMMM').slice(1);
        const year = activeDate.format('YYYY');
        return `${month} ${year}`;
    };

    // Генерация сетки дней
    const getDaysGrid = () => {
        const daysInMonth = activeDate.daysInMonth();
        const firstDayOfMonth = activeDate.startOf('month').day();
        const daysFromPrevMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const totalDaysToShow = 42; // 6 недель
        const daysFromNextMonth = totalDaysToShow - daysInMonth - daysFromPrevMonth;

        const days = [];

        // Дни предыдущего месяца
        for (let i = daysFromPrevMonth; i > 0; i--) {
            days.push(activeDate.startOf('month').subtract(i, 'day'));
        }

        // Дни текущего месяца
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(activeDate.date(i));
        }

        // Дни следующего месяца
        for (let i = 1; i <= daysFromNextMonth; i++) {
            days.push(activeDate.endOf('month').add(i, 'day'));
        }

        return days;
    };

    const daysGrid = getDaysGrid();
    const isSelectedDay = (date: Dayjs) => {
        return activeDate.isSame(date, 'day') && (selectedDate || value);
    };

    const isCurrentDay = (date: Dayjs) => dayjs().isSame(date, 'day');
    const isInactiveDay = (date: Dayjs) => !activeDate.isSame(date, 'month');

    // Обработчики
    const setPrevMonth = () => {
        const newDate = activeDate.subtract(1, 'month');

        setSelectedDate(newDate);
        handleChangeDate(newDate);
    };

    const setNextMonth = () => {
        const newDate = activeDate.add(1, 'month');
        setSelectedDate(newDate);
        handleChangeDate(newDate);
    };

    const setSelectedDay = (date: Dayjs) => {
        const newDate = date.endOf('day');
        setSelectedDate(newDate);
        handleChangeDate(newDate);
    };

    const handleChangeDate = (date: Dayjs) => {
        if (onChange) {
            onChange(date.endOf('day'));
        }
    };
    return {
        currentDate,
        selectedDate,
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
        setCurrentDate,
    };
};
