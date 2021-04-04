import React from 'react';
import Card from '../../components/Card';
import { deleteNote } from '../../redux/actions/noteActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import '../../styles/box-sizing.css';
import '../../styles/typography.css';
import '../../styles/forms-util.css';
import '../../styles/layout.css';
import '../../styles/util.css';

function NotesList() {
  const notes = useSelector(state => state.notes);
  const history = useHistory();
  const dispatch = useDispatch();

  const list = notes.map(note =>
    (
      <Card key={note.id} title={note.title} body={note.body}>
        <div className='grid-col-2 text-center border-top'>
          <div className='pd-5'>
            <button onClick={() => history.push(`/note/${note.id}`)}
              className='btn-link fs-pt8em color-blackishBlue'>
              <span>Edit</span>
            </button>
          </div>
          <div className='border-left pd-5'>
            <button onClick={() => dispatch(deleteNote(note.id))}
              className='btn-link fs-pt8em color-danger'>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </Card>
    ));

  return (
      list.length === 0 ? (<h4 className="blackish-blue mt-40">No notes found plz add a note.</h4>)
          : (<>
            <h3 className="blackish-blue mt-40 mb-0">All Notes</h3>
            <div className="grid-col-3">{ list }</div>
          </>)
  );
}

export default NotesList;
