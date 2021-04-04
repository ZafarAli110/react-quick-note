import React from 'react';
import NoteFormUsingClass from './pages/notes/NoteFormUsingClass';
import NavBar from './components/NavBar';
import NoteFormUsingHooks from './pages/notes/NoteFormUsingHooks';
import NotesList from './pages/notes/NotesList';
import NotFound from './pages/not-found/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './styles/box-sizing.css';
import './styles/util.css';

function App() {
  return (
    <div className='full-height grayBg pd-16'>
      <Router>
        <NavBar />
        <Switch>
          <Route key='addNote'
                 exact
                 path="/"
                 component={(props) => <NoteFormUsingHooks {...props} />}>
          </Route>
          <Route key='editNote'
                 exact
                 path="/note/:id"
                 component={(props) => <NoteFormUsingHooks {...props} />}>
          </Route>
          <Route exact
                 path="/allnotes"
                 component={(props) => <NotesList  {...props} />}>
          </Route>
          <Route component={NotFound} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
