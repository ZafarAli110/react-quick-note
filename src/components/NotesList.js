import React from 'react';
import './styles.css';

export default function NotesList(props) {
  function renderList() {
    return props.data.map(note => (
      <div key={note.id} className='flat-card gray-border marginTop-10 flex-column'>
         <div className='border-bottom padding-5'>
           <label className='label-bold break-word fs-pt8em'>
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
            <button onClick={() => props.history.push(`/note/${note.id}`)} className='btn-link fs-pt8em blackish-blue'>
               <span>Edit</span>
             </button>
           </div>
           <div className='border-left padding-5'>
             <button onClick={() => props.deleteNote(note.id)} className='btn-link fs-pt8em blackish-blue'>
               <span>Delete</span>
             </button>
           </div>
         </div>
      </div>
    ));
  }

  function showList() {
    return (
      <>
      <h3 className='blackish-blue mt-40 mb-0'>All Notes</h3>
      <div className='grid-col-3'>
       {renderList()}
        </div>
      </>
    )
  }

  return (
    <>
      { props.data.length > 0 ? showList() : <h4 className='blackish-blue mt-40'>No notes found plz add a note.</h4>}
   </>
  );

}
