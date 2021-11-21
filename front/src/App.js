import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import SignTemplate from './SignPage/SignTemplate';


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
              <SignTemplate />
            </Router>
        </>
    );
}

export default App;