import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Tasks } from './pages/Tasks';

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [authenticated, setAuthenticated] = useState(false)
  const togglePage = (pageName) => {
    setCurrentPage(pageName)
  }

  const setAuthentication = (value) =>{
    setAuthenticated(value)
  }

  return (
    <div className="App">
      {
        authenticated? <Tasks/> :currentPage === "login"? <Login togglePage={togglePage} setAuthentication={setAuthentication}/> : <Register togglePage={togglePage} setAuthentication={setAuthentication}/>
      }
    </div>
  );
}

export default App;
