import { TaskStatus } from "../model/types";

export const getTaskStatusColor = (status: TaskStatus) => {
    return {
        [TaskStatus.ACTIVE]: 'yellow',
        [TaskStatus.COMPLETED]: 'green',
        [TaskStatus.ENDED]: 'red'
    }[status] as 'yellow' | 'green' | 'red'
}