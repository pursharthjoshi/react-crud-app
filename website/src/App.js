import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import AllUsers from './pages/all-users';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  const checkIsLoggedIn = () => {
    let token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }

  const checkAndRedirect = (navigate) => {
    let token = localStorage.getItem("token");
    if (token == null || token == undefined) {
      navigate('/login');
    }
  };

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<Profile checkAndRedirect={checkAndRedirect} isLoggedIn={isLoggedIn} />} path='/account' />

          <Route element={<Login checkIsLoggedIn={checkIsLoggedIn} checkAndRedirect={checkAndRedirect} isLoggedIn={isLoggedIn} />} path='/login' />

          <Route element={<Register checkIsLoggedIn={checkIsLoggedIn} checkAndRedirect={checkAndRedirect} isLoggedIn={isLoggedIn} />} path='/register' />

          <Route element={<AllUsers checkAndRedirect={checkAndRedirect} isLoggedIn={isLoggedIn} />} path='/' />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
