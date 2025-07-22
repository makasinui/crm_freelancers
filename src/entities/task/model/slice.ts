import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "./types";

const initialState: Task[] = [];

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
        }
    }
});

export const { addTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;