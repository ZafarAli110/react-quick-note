import React, { useState } from 'react';
import NotesList from './components/NotesList';
import AddNote from './components/AddNote';
import NavBar from './components/NavBar';
import './components/styles.css';
import './App.css';

function App() {
  const initialState = [];
  const [state, setState] = useState(initialState);
  const updateState = newNote => {
    const nextState = [
      ...state,
      newNote
    ];
    setState(nextState);
  };
  return (
    <>
      <NavBar />
      <div className='full-height grayBg padding-16 mt-20'>
        <AddNote state={state} updateState={updateState} />
        <div className='grid-col-3'>
          <NotesList data={state} />
        </div>
      </div>
    </>
  );
}

export default App;
