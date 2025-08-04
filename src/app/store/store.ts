import { configureStore } from "@reduxjs/toolkit";
import { taskReducer } from '@/entities/task/';
import { noteReducer } from "@/entities/note";

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        notes: noteReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;