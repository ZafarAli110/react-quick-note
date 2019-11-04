import React from 'react';
import uuid from 'uuid';
import classnames from 'classnames';
import { conditionally, pipe, and } from '../utils/helpers';
import { validateNoteForm } from '../utils/form-validations';
import useForm from '../custom-hooks/useForm';
import TextInputGroup from '../components/TextInputGroup';

import '../styles/box-sizing.css';
import '../styles/typography.css';
import '../styles/forms-util.css';
import '../styles/util.css';


function CreateNote({ state, match, history, saveNote, editNote }) {
  const hasId = ({ ...params }) => params.id;
  const findNote = id => state.find(note => note.id === id);
  const noteToBeEdit = findNote(match.params.id);
  const navigateToAllNotes = () => history.push('/allNotes');
  const takeAction = newNote =>
    noteToBeEdit ? editNote.call(this, newNote) : saveNote.call(this, newNote);

  const initialState = conditionally({
    if: hasId,
    then: () => ({ title: noteToBeEdit.title, body: noteToBeEdit.body }),
    else: () => ({ title: '', body: '' })
  })(match.params);

  const submitForm = pipe(
    createNewNote,
    takeAction,
    navigateToAllNotes
  );

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setErrors } = useForm(initialState,validateNoteForm,submitForm);

  const onValueChange = pipe(resetErrors,handleChange);

  function createNewNote({ title, body }) {
    return {
      id: noteToBeEdit ? noteToBeEdit.id : uuid(),
      title: title,
      body: body
    };
  }

  function resetErrors(event) {
    const { name, value } = event.target;
    const { title, body } = errors;
    const isTitleValid = and(name === 'title')(title, title === '*title is required.', !!value);
    const isTitleLengthValid = and(name === 'title')(title, title === '*title should not be greater than 50 characters.', value.length <= 50);
    const isBodyValid = and(name === 'body')(body, value);
    setErrors({
      ...errors,
      ...(isTitleValid && { title: null }),
      ...(isTitleLengthValid && { title: null }),
      ...(isBodyValid && { body: null }),
    });
    return event;
  }

  const actionType = noteToBeEdit ? 'Edit' : 'Add';
  const invalidTitleClass = classnames({'invalid-input': errors.title,'gray-border': !errors.title});
  const invalidContentClass = classnames({'invalid-input': errors.body,'gray-border': !errors.body});

  return (
    <form onSubmit={handleSubmit} className='mt-40'>
      <div className='flex-col'>
        <h3 className='color-blackishBlue mb-0'>{actionType} a note</h3>
        <TextInputGroup labelTitle=' Note Title'
          TagName='input'
          placeholder='Note title'
          name='title'
          value={values.title}
          onChange={onValueChange}
          type='text'
          error={errors.title}
          className={"width-80 fs-12 mt-10 pd-5 " + invalidTitleClass}/>

        <TextInputGroup labelTitle='Note Content'
          TagName='textarea'
          placeholder='Note description'
          name='body'
          value={values.body}
          onChange={onValueChange}
          type='text'
          error={errors.body}
          className={"width-80 fs-12 minHeight-150 mt-10 pd-5 " + invalidContentClass}/>

        <button type="submit" className='mt-10 btn btn-small'>
          <span>{actionType} note</span>
        </button>
      </div>
    </form>
  );
}

export default CreateNote;
