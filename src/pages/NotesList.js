import React from 'react';
import Card from '../components/Card';

import '../styles/box-sizing.css';
import '../styles/typography.css';
import '../styles/forms-util.css';
import '../styles/layout.css';
import '../styles/util.css';

export default function NotesList(props) {
  function renderList() {
    return props.data.map(note => (
      <Card key={note.id} title={note.title} body={note.body}>
        <div className='grid-col-2 text-center border-top'>
           <div className='pd-5'>
            <button onClick={() => props.history.push(`/note/${note.id}`)}
              className='btn-link fs-pt8em color-blackishBlue'>
               <span>Edit</span>
             </button>
           </div>
           <div className='border-left pd-5'>
            <button onClick={() => props.deleteNote(note.id)}
              className='btn-link fs-pt8em color-blackishBlue'>
               <span>Delete</span>
             </button>
           </div>
         </div>
      </Card>
    ));
  }

  function showList() {
    return (
      <>
        <h3 className="blackish-blue mt-40 mb-0">All Notes</h3>
        <div className="grid-col-3">{renderList()}</div>
      </>
    );
  }

  return (
    <>
      {props.data.length > 0 ? (
        showList()
      ) : (
        <h4 className="blackish-blue mt-40">No notes found plz add a note.</h4>
      )}
    </>
  );
}
