import React from 'react';
import uuid from 'uuid';
import classnames from 'classnames';
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
  and = (x) => (...y) => y.reduce((acc, val) => acc && val, x);
  setError = field => msg => this.setState({ errors: { [field]: msg } });
  setTitleError = this.setError('title');
  setBodyError = this.setError('body');

  validateForm = (title, body ) => {
    if (!title) {
      this.setTitleError('*title is required.');
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
    const isTitleValid = this.and(name === 'title')(errors.title,value);
    const isBodyValid = this.and(name === 'body')(errors.body,value);
    this.setState({
      [name]: value,
      ...(isTitleValid && { errors: { title: null } }),
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
    const action = this.noteToBeEdit ? 'Edit' : 'Add';
    const titleError = this.and(errors)(errors.title) && (
      <span className='fs-10 color-danger'>
        {errors.title}
      </span>);
    const bodyError = this.and(errors)(errors.body) && (
      <span className='fs-10 color-danger'>
        {errors.body}
      </span>);

    return (
      <form onSubmit={this.handleSubmit} className='mt-40'>
        <h3 className='color-blackishBlue'>{action} a note</h3>
        <div className='flex-col'>
          <label className='font-bold fs-12'>
            Note Title
        </label>
          <input
            className={classnames('width-80', 'fs-12', 'mt-10','pd-5',
              {
                'invalid-input': titleError,
                'gray-border': !titleError
              }
            )}
            placeholder='Note title'
            type='text'
            name='title'
            value={title}
            onChange={this.handleChange}></input>
            { titleError }
          <label className='mt-20 font-bold fs-12'>
            Note Content
          </label>
          <textarea
            className={classnames('width-80', 'fs-12', 'minHeight-150', 'mt-10','pd-5',
              {
                'invalid-input': bodyError,
                'gray-border': !bodyError
              }
            )}
            placeholder='Note description'
            type='text'
            name='body'
            value={body}
            onChange={this.handleChange}></textarea>
            { bodyError}

          <button type="submit" className='mt-10 btn btn-small'>
            <span>{action} note</span>
          </button>
        </div>
      </form>
    );
  }
}

export default CreateNoteUsingClass;