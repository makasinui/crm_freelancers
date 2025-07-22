import type { Dayjs } from "dayjs";

export const formatDate = (date: Dayjs, format = 'YYYY-MM-DD') => {
    return date.format(format);
}