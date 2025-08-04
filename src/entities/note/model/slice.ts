import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "./types";

const initialState: Note[] = [];

export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            state.push(action.payload)
        },
        editNote: (state, action: PayloadAction<Note>) => {
            const idx = state.findIndex(note => note.id === action.payload.id)
            if(idx !== -1) {
                state[idx] = action.payload;
            }
        },
        deleteNote: (state, action: PayloadAction<string>) => {
            return state.filter(note => note.id !== action.payload)
        },
    }
});

export const { addNote, editNote, deleteNote } = noteSlice.actions;
export default noteSlice.reducer;