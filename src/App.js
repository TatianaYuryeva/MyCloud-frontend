import { useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UploadForm from "./components/UploadForm";

import './App.css';
import Menu from "./components/Menu";

function App() {
  const [isLogined, setLogin] = useState(false)
  const navigateTo = useNavigate()

  return (
    <div className="App">
      <Menu loginStatus={isLogined}/>
      <div className="page">
        <Routes>
          <Route path="/login" exact element={<LoginForm setLoginStatus={setLogin} navigateTo={navigateTo}/>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/storage" element={<UploadForm />} />
        </Routes>
      </div>
    </div>
  );
}   

export default App;
