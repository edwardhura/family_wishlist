import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginLink } from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginLink/>
      </header>
    </div>
  );
}

export default App;
