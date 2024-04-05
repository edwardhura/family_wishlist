import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { LoginLink, LogoutLink} from './components'
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('/api/users/me', { withCredentials: true })
  }, [])
  

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
