import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UploadForm from "./components/UploadForm";

import './App.css';
import Menu from "./components/Menu";
import Administration from './components/Administration';

function App() {
  const [isLogined, setLogined] = useState(false)
  const [token, setToken] = useState(undefined)
  const [userName, setUserName] = useState(undefined)
  const [isAdmin, setIsAdmin] = useState(false)
  const navigateTo = useNavigate()

  const getUser = () => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      setUserName(localStorage.getItem('name'))
      setIsAdmin(localStorage.getItem('isAdmin') === 'true' ? true : false)
      setLogined(true)
    }
  }

  const fetchUser = async (token, username) => {
    const response = await fetch(`http://localhost:8000/users/?username=${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })

    const res = await response.json()
    setUserName(res[0].first_name)
    setIsAdmin(res.is_staff)
    localStorage.setItem('name', res[0].first_name)
    localStorage.setItem('isAdmin', res[0].is_staff)
  }

  const fetchUsersList = async (token) => {
    const response = await fetch('http://localhost:8000/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      } 
    })

    const res = await response.json()
    console.log(res)
  }

  const fetchLogout = async (token) => {
    const response = await fetch('http://localhost:8000/logout/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })

    if (response.status === 200) {
      setLogined(false)
      setToken(undefined)
      setUserName(undefined)
      setIsAdmin(false)
      localStorage.clear()
    }
    
  }

  const logout = (isLogined) => {
    if (isLogined) {
      fetchLogout(token)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="App">
      <Menu loginStatus={isLogined} clickHandler={logout} userName={userName}/>
      <div className="page">
        <Routes>
          <Route path="/login" exact element={<LoginForm setLoginStatus={setLogined} setToken={setToken} fetchUser={fetchUser} navigateTo={navigateTo}/>} />
          <Route path="/register" element={<RegisterForm navigateTo={navigateTo}/>} />
          <Route path="/storage" element={<UploadForm token={token}/>} />
          <Route path="/admin" element={isAdmin ? <Administration token={token} fetchUsersList={fetchUsersList}/> : `
          У вас нет прав для просмотра данной страницы`} />
        </Routes>
      </div>
    </div>
  );
}   

export default App;
