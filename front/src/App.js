import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import MainPage from './pages/MainPage';


const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;


function App() {

    return (
        <>
            <GlobalStyle />
            <Router>
                <Route path="/:id" component={MainPage} />
            </Router>
        </>
    );
}

export default App;