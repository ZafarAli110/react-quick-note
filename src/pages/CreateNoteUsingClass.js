import React from 'react';
import uuid from 'uuid';
import classnames from 'classnames';
import { and } from '../utils/helpers';
import TextInputGroup from '../components/TextInputGroup';

import '../styles/box-sizing.css';
import '../styles/typography.css';
import '../styles/forms-util.css';
import '../styles/util.css';

class CreateNoteUsingClass extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    if (id) {
      this.noteToBeEdit = this.props.state.find(note => note.id === id);
    }
    this.state = {
      title:  this.noteToBeEdit ? this.noteToBeEdit.title : '',
      body: this.noteToBeEdit ? this.noteToBeEdit.body : '',
      errors: {}
    };
  }
  resetState = () => this.setState({title : '' , body:'' , errors:{}});
  setError = field => msg => this.setState({ errors: { [field]: msg } });
  setTitleError = this.setError('title');
  setBodyError = this.setError('body');

  validateForm = (title, body ) => {
    if (!title) {
      this.setTitleError('*title is required.');
      return false;
    }
    if (title.length > 50) {
      this.setTitleError('*title should not be greater than 50 characters.');
      return false;
    }
    if (!body) {
      this.setBodyError('*note content is required.');
      return false;
    }
    return true;
  }

  handleChange = e => {
    const { name, value } = e.target;
    const { errors } = this.state;
    const isTitleValid = and(name === 'title')(errors.title, errors.title === '*title is required.', !!value);
    const isTitleLengthValid = and(name === 'title')(errors.title, errors.title === '*title should not be greater than 50 characters.', value.length <= 50);
    const isBodyValid = and(name === 'body')(errors.body,value);
    this.setState({
      [name]: value,
      errors: {...errors},
      ...(isTitleValid && { errors: { title: null } }),
      ...(isTitleLengthValid && { errors: { title: null } }),
      ...(isBodyValid && { errors: { body: null } }),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body } = this.state;
    if (!this.validateForm(title, body)) {
      return;
    }
    const newNote = {
      id: this.noteToBeEdit ? this.noteToBeEdit.id : uuid(),
      title: title ,
      body: body
    };
    this.noteToBeEdit ? this.props.editNote(newNote) : this.props.saveNote(newNote);
    this.props.history.push("/allnotes");
    this.resetState();
  };

  render() {
    const { title, body, errors } = this.state;
    const actionType = this.noteToBeEdit ? 'Edit' : 'Add';
    const invalidTitleClass = classnames({'invalid-input': errors.title,'gray-border': !errors.title});
    const invalidContentClass = classnames({'invalid-input': errors.body,'gray-border': !errors.body});

    return (
      <form onSubmit={this.handleSubmit} className='mt-40'>
      <div className='flex-col'>
        <h3 className='color-blackishBlue mb-0'>{actionType} a note</h3>
        <TextInputGroup labelTitle=' Note Title'
          TagName='input'
          placeholder='Note title'
          name='title'
          value={title}
          onChange={this.handleChange}
          type='text'
          error={errors.title}
          className={"width-80 fs-12 mt-10 pd-5 " + invalidTitleClass}/>

        <TextInputGroup labelTitle='Note Content'
          TagName='textarea'
          placeholder='Note description'
          name='body'
          value={body}
          onChange={this.handleChange}
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
}

export default CreateNoteUsingClass;