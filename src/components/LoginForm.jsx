import { useState } from "react"
import { NavLink } from "react-router-dom"

export default function LoginForm({setLoginStatus, setToken, fetchUser, navigateTo}) {
  const [username, setUsername] = useState('')
  const [userPassword, setUserpassword] = useState('')

  const user = {
    username: username,
    password: userPassword
  }
  

  const login = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const res = await response.json()

    if (res.token) {
      localStorage.setItem('token', res.token)
      setLoginStatus(true)
      setToken(res.token)
      fetchUser(res.token, username)
      navigateTo('/storage')
    } else {
      console.log(res)
    }
    
  }

  return (
    <form className="form form-login" onSubmit={login}>
      <div className="form__group">
        <label htmlFor="form-login__username">Логин</label>
          <input type="text" 
            value={user.username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>   
        <div className="form__group">
        <label htmlFor="form-register__password">Пароль</label>
          <input type="password" 
            value={user.password}
            onChange={e => setUserpassword(e.target.value)}
            required
          />
        </div>              
        <button className="btn form__btn">Войти</button>
        <NavLink to="/register" className="register-link">Регистрация</NavLink>
      </form>
  )
}