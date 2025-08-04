import type { Dayjs } from "dayjs"

export interface Note {
    id: string
    title: string
    content: string
    createdAt: Dayjs
}