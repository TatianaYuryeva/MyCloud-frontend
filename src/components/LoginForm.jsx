import { useState } from "react"

export default function LoginForm({setLoginStatus, setToken, getUserName, navigateTo}) {
  const [username, setUsername] = useState('')
  const [userPassword, setUserpassword] = useState('')
  //const [isLogined, setLogin] = useState(false)

  const user = {
    username: username,
    password: userPassword
  }
  

  const login = async (e) => {
    e.preventDefault()
    //console.log(user)

    const response = await fetch('http://localhost:8000/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const res = await response.json()

    console.log(res.token)
    if (res.token) {
      setLoginStatus(true)
      setToken(res.token)
      getUserName(res.token)
      navigateTo('/')
    } else {
      console.log(res)
    }
    
  }

  return (
    <form className="form form-login" onSubmit={login}>
      <div className="form-group">
        <label htmlFor="form-login__username">Логин</label>
          <input type="text" 
            value={user.username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>   
        <div className="form-group">
        <label htmlFor="form-register__password">Пароль</label>
          <input type="password" 
            value={user.password}
            onChange={e => setUserpassword(e.target.value)}
          />
        </div>              
        <button className="btn form__btn">Войти</button>
      </form>
  )
}