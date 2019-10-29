import React from 'react';
import './styles.css';

class AddNote extends React.Component {

  constructor(prop) {
    super(prop);
  }

  state = {
    title: '',
    body: '',
    errors: null
  };

  resetState = () => this.setState({title : '' , body:'' , errors:null});

  handleChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    });

    if (this.state.errors.title) {
      this.setState({ errors: { title : null } });
    }

    if (this.state.errors.body) {
      this.setState({ errors: { body : null } });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, body } = this.state;

    if (!title) {
      this.setState({ errors: { title: '*title is required.' } });
      return;
    }

    if (!body) {
      this.setState({ errors: { body: '*note content is required.' } });
      return;
    }

    const newNote = {
      id: new Date(),
      title: title ,
      body: body
    };
    this.props.saveNote(newNote);
    this.resetState();
  };

  render() {
    const { title, body , errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className='blackish-blue'>Add a note</h3>
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
          {(errors && errors.title) && <span className='error-note'>{errors.title}</span>}
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
          {(errors && errors.body) && <span className='error-note'>{errors.body}</span>}

          <button type="submit" className='marginTop-10 btn btn-small'>
            <span>Add note</span>
          </button>
        </div>
      </form>
    );
  }
}

export default AddNote;