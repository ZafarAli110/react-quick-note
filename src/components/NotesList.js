import React from 'react';
import './styles.css';

export default function NotesList({ data }) {
  return data.map(note => (
    <div key={note.id} className='flat-card gray-border marginTop-10 flex-column'>
      <div className='border-bottom padding-5'>
        <label className='label-bold break-word'>
          {note.title}
        </label>
      </div>
      <div className='padding-10 flex-grow'>
        <p className='font-standard no-margin break-word'>
          {note.body}
        </p>
      </div>
      <div className='grid-col-2 text-center border-top'>
        <div className='padding-5'>
          <button className='btn-link fs-pt9em blackish-blue'>
            <span>Edit</span>
          </button>
        </div>
        <div className='border-left padding-5'>
          <button className='btn-link fs-pt9em blackish-blue'>
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  ));
}
