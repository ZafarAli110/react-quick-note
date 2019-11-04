import React, { useState } from 'react';
import CreateNoteUsingClass from './pages/CreateNoteUsingClass';
import NavBar from './components/NavBar';
import CreateNote from './pages/CreateNote';
import NotesList from './pages/NotesList';
import NotFound from './pages/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './styles/box-sizing.css';
import './styles/util.css';

function App() {
  const initialState = {
    notes:[]
  };
  const [state, setState] = useState(initialState);

  const saveNote = (newNote) => {
    const nextState = {
     notes:[ ...state.notes,newNote]
    };
    setState(nextState);
  };

  const editNote = (newNote) => {
    const newState = {
      notes: state.notes.map(note => note.id === newNote.id ? {...note,...newNote} : note)
    };
    setState(newState);
  }

  const deleteNote = (id) => {
    const newState = {
      notes: state.notes.filter(note => note.id !== id)
    };
    setState(newState);
  }
  return (
    <div className='full-height grayBg pd-16'>
      <Router>
        <NavBar />
        <Switch>
          <Route key='addNote'
                 exact
                 path="/"
                 component={(props) => <CreateNote state={state.notes} saveNote={saveNote}  {...props} />}>
          </Route>
          <Route key='editNote'
                 exact
                 path="/note/:id"
                 component={(props) => <CreateNote state={state.notes} editNote={editNote} saveNote={saveNote}  {...props} />}>
          </Route>
          <Route exact
                 path="/allnotes"
                 component={(props) => <NotesList data={state.notes} deleteNote={deleteNote} {...props} />}>
          </Route>
          <Route component={NotFound} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
