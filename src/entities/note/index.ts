import noteReducer, { editNote, deleteNote, addNote } from './model/slice';
import type { Note } from './model/types';
import NoteCard from './ui/NoteCard/NoteCard';
import NoteList from './ui/NoteList/NoteList';

export {
    noteReducer,
    editNote,
    deleteNote,
    addNote,
    NoteCard,
    NoteList,
    type Note
}