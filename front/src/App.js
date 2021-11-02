import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FriendList from './components/FriendList';
import { createGlobalStyle } from 'styled-components';
import MemoTemplate from './components/MemoTemplate';
import MemoList from './components/MemoList';
import MemoCreate from './components/MemoCreate';
import { MemoProvider } from './components/MemoContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
    <DndProvider backend={HTML5Backend}>
    <MemoProvider>
        <GlobalStyle />
        <Router>
            <FriendList />
            <Switch>
                <Route path='/' />
            </Switch>
        </Router>
    
        <MemoTemplate>
            <MemoList />
            <MemoCreate />
        </MemoTemplate>
    </MemoProvider>
    </DndProvider>
    </>
  );
}

export default App;