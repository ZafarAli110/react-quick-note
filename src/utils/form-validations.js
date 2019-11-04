function validateNoteForm(values) {
    const { title, body } = values;
    const errors = {};
    !title && (errors.title = '*title is required.');
    title.length > 50 && (errors.title = '*title should not be greater than 50 characters.');
    !body && (errors.body = '*note content is required.');
    return errors;
}

export {
    validateNoteForm
};