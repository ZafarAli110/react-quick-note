import React, { useRef } from 'react';
import './styles.css';


export default function AddNote(prop) {
  const inputRef = useRef();
  const titleRef = useRef();
  const addNote = () => {
    const newNote = {
      id: Math.floor(Math.random() * 1000 + 1),
      title: titleRef.current.value,
      text: inputRef.current.value
    };
    prop.updateState(newNote);
    inputRef.current.value = '';
    titleRef.current.value = '';
  };
  return (
    <>
      <h3 className='blackish-blue'>Add a note</h3>
      <div className='flex-column'>
        <label className='label-bold font-standard'>
          Note Title
        </label>
        <input
          className='width-80 font-standard gray-border marginTop-10 padding-5'
          placeholder="Note title"
          type="text"
          ref={titleRef}></input>

        <label className='marginTop-20 label-bold font-standard'>
          Note Content
        </label>
        <textarea
          className='width-80 font-standard minHeight-150 marginTop-10 gray-border padding-5'
          placeholder="Note description"
          type="text"
          ref={inputRef}></textarea>

        <button onClick={addNote} className='marginTop-10 btn btn-small'>
          <span>Add note</span>
        </button>
      </div>
    </>
  );
}
