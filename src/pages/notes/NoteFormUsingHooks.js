import React from 'react';
import uuid from 'uuid';
import classnames from 'classnames';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { conditionally, pipe, and, or } from '../../utils/helpers';
import { validateNoteForm } from '../../utils/form-validations';
import useForm from '../../custom-hooks/useForm';
import TextInputGroup from '../../components/TextInputGroup';
import { addNote, editNote } from '../../redux/actions/noteActions';

import '../../styles/box-sizing.css';
import '../../styles/typography.css';
import '../../styles/forms-util.css';
import '../../styles/util.css';


function setInitialState(note) {
  const initialState = conditionally({
    if: (note)=> !!note,
    then: (note) => ({ title: note.title, body: note.body }),
    else: () => ({ title: '', body: '' })
  })(note);
  return initialState;
}

function NoteFormUsingHooks() {
  const notes = useSelector(state => state.notes);
  const { id } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  const noteToBeEdit = notes.find(note => note.id === id);
  const navigateToAllNotes = () => history.push('/allNotes');

  const action = noteToBeEdit ? editNote : addNote;
  const takeAction = note => dispatch(action.call(this, note));
  
  const initialState = setInitialState(noteToBeEdit);
  const submitForm = pipe(
    createNote,
    takeAction,
    navigateToAllNotes
  );

  const [
    handleSubmit,
    handleChange,
    values,
    errors,
    setErrors ] = useForm(initialState,validateNoteForm,submitForm);

  const onValueChange = pipe(resetErrors,handleChange);

  function createNote({ title, body }) {
    return {
      id: noteToBeEdit ? noteToBeEdit.id : uuid(),
      title: title,
      body: body
    };
  }

  function resetErrors(event) {
    const { name, value } = event.target;
    const { title, body } = errors;
    const isTitleValid = and(name === 'title')(title === '*title is required.', !!value);
    const isTitleLengthValid = and(name === 'title')(title === '*title should not be greater than 50 characters.', value.length <= 50);
    const isBodyValid = and(name === 'body')(body, !!value);
    
    or(isTitleValid)(isTitleLengthValid,isBodyValid) && setErrors({
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
        <TextInputGroup labelTitle='Note Title'
          TagName='input'
          placeholder='Note title'
          name='title'
          value={values.title}
          onChange={onValueChange}
          type='text'
          error={errors.title}
          className={'width-80 fs-12 mt-10 pd-5 ' + invalidTitleClass}/>

        <TextInputGroup labelTitle='Note Content'
          TagName='textarea'
          placeholder='Note description'
          name='body'
          value={values.body}
          onChange={onValueChange}
          type='text'
          error={errors.body}
          className={'width-80 fs-12 minHeight-150 mt-10 pd-5 ' + invalidContentClass}/>

        <button type="submit" className='mt-10 btn btn-small'>
          <span>{actionType} note</span>
        </button>
      </div>
    </form>
  );
}

export default NoteFormUsingHooks;
