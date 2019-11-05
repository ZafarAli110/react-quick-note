export const Add_Note = 'Add_Note';
export const Edit_Note = 'Edit_Note';
export const Delete_Note = 'Delete_Note';

export function addNote(note) {
    return { type: Add_Note, note: note };
}

export function editNote(note) {
    return { type: Edit_Note, note: note };
}

export function deleteNote(id) {
    return { type: Delete_Note, id: id };
}
