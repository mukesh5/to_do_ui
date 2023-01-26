import React, {useEffect, useState} from 'react';
import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Tasks } from './pages/Tasks';

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('token')){
      setAuthenticated(true)
    }
  }, [])
  const togglePage = (pageName) => {
    setCurrentPage(pageName)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setAuthenticated(false)
  }

  const setAuthentication = (value) =>{
    setAuthenticated(value)
  }

  return (
    <div className="App">
      {
        authenticated? <Tasks logout={logout}/> :currentPage === "login"? <Login togglePage={togglePage} setAuthentication={setAuthentication}/> : <Register togglePage={togglePage} setAuthentication={setAuthentication}/>
      }
    </div>
  );
}

export default App;
