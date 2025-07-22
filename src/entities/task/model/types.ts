import type { Dayjs } from "dayjs";

export const TaskStatus = {
  COMPLETED: 'completed',
  ACTIVE: 'active',
  ENDED: 'ended',
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

export interface Task {
    id: string
    title: string
    status: TaskStatus
    description?: string
    endDate?: Dayjs
}

