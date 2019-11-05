import { Add_Note , Edit_Note , Delete_Note } from "../actions/noteActions";

function notesReducers(notes=[], action) {
    switch (action.type) {
        case Add_Note:
            return [...notes, action.note];
        case Edit_Note:
            return notes.map(note => note.id === action.note.id ? { ...note, ...action.note } : note);
        case Delete_Note:
            return notes.filter(note => note.id !== action.id);
        default:
            return notes;
    }
}

export default notesReducers;