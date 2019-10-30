import React from 'react';
import uuid from 'uuid';
import './styles.css';

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    const id = this.props.match.params.id;
    if (id) {
      this.noteToBeEdit = this.props.state.find(note => note.id == id); ;
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
    const { errors, title, body } = this.state;
    this.setState({
      [name]: value,
      ...(this.and(title)(errors.title) && { errors: { title: null } }),
      ...(this.and(body)(errors.body) && { errors: { body: null } }),
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
    return (
      <form onSubmit={this.handleSubmit} className='mt-40'>
        <h3 className='blackish-blue'>{action} a note</h3>
        <div className='flex-column'>
          <label className='label-bold font-standard'>
            Note Title
        </label>
          <input
            className='width-80 font-standard gray-border marginTop-10 padding-5'
            placeholder='Note title'
            type='text'
            name='title'
            value={title}
            onChange={this.handleChange}></input>
          { this.and(errors)(errors.title) && <span className='error-note'>{errors.title}</span>}
          <label className='marginTop-20 label-bold font-standard'>
            Note Content
          </label>
          <textarea
            className='width-80 font-standard minHeight-150 marginTop-10 gray-border padding-5'
            placeholder='Note description'
            type='text'
            name='body'
            value={body}
            onChange={this.handleChange}></textarea>
          { this.and(errors)(errors.body) && <span className='error-note'>{errors.body}</span>}

          <button type="submit" className='marginTop-10 btn btn-small'>
            <span>{action} note</span>
          </button>
        </div>
      </form>
    );
  }
}

export default AddNote;