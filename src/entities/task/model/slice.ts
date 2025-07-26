import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task, TaskStatus } from "./types";
import dayjs from "dayjs";

const initialState: Task[] = [
    {
        id: '1',
        title: 'New TASK MOCKKKKK',
        description: 'need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be need to be',
        status: 'active',
        endDate: dayjs().add(1, 'day')
    },
    {
        id: '2',
        title: 'New TASK MOCKKKKK',
        description: '',
        status: 'completed',
        endDate: dayjs().add(1, 'day')
    },
    {
        id: '3',
        title: 'New TASK MOCKKKKK',
        description: '',
        status: 'ended',
        endDate: dayjs().add(1, 'day')
    }
];

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.push(action.payload)
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const idx = state.findIndex(task => task.id === action.payload.id)
            if(idx !== -1) {
                state[idx] = action.payload;
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            return state.filter(task => task.id !== action.payload)
        },
        dragBetweenColumns: (state, action: PayloadAction<{id: string; status: TaskStatus}>) => {
            const { id, status } = action.payload;
            const idx = state.findIndex(task => task.id === id);
            if(idx !== -1) {
                state[idx].status = status;
            }
        }
    }
});

export const { addTask, editTask, deleteTask, dragBetweenColumns } = taskSlice.actions;
export default taskSlice.reducer;