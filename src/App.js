import { useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UploadForm from "./components/UploadForm";

import './App.css';
import Menu from "./components/Menu";

function App() {
  const [isLogined, setLogined] = useState(false)
  const [token, setToken] = useState(undefined)
  const [userName, setUserName] = useState(undefined)
  const navigateTo = useNavigate()

  const getUserName = async (token) => {
    console.log(token)
    const response = await fetch('http://localhost:8000/users/1/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })

    const res = await response.json()
    console.log(res)
    setUserName(res.first_name) 
  }

  const logout = async (token) => {
    //e.preventDefault()
    console.log(`Token ${token}`)

    const response = await fetch('http://localhost:8000/logout/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`
      }
    })

    //const res = await response.json()
    setToken(undefined)
    setUserName(undefined)
    console.log(response.status)
    // if (res.token) {
    //   setLoginStatus(true)
    //   navigateTo('/')
    // } else {
    //   console.log(res)
    // }
    
  }

  const clickHandler = (isLogined) => {
    if (isLogined) {
      logout(token)
      setLogined(false)
    }
  }

  return (
    <div className="App">
      <Menu loginStatus={isLogined} clickHandler={clickHandler} userName={userName}/>
      <div className="page">
        <Routes>
          <Route path="/login" exact element={<LoginForm setLoginStatus={setLogined} setToken={setToken} getUserName={getUserName} navigateTo={navigateTo}/>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/storage" element={<UploadForm />} />
        </Routes>
      </div>
    </div>
  );
}   

export default App;
