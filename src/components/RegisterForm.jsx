import { useState } from "react"

export default function RegisterForm() {
  const [username, setUsername] = useState('')
  const [userFirstname, setUserFirstname] = useState('')
  const [userLastname, setUserLastname] = useState('')
  const [userEmail, setUseremail] = useState('')
  const [userPassword, setUserpassword] = useState('')

  const user = {
    username: username,
    first_name: userFirstname,
    last_name: userLastname,
    email: userEmail,
    password: userPassword
  }
  

  const addUser = async (e) => {
    e.preventDefault()
    console.log(user)

    const response = await fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
  }

  return (
    <form className="form form-register" onSubmit={addUser}>
      <div className="form-group">
        <label htmlFor="form-register__username">Логин</label>
          <input type="text" 
            value={user.username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>  
      <div className="form-group">
        <label htmlFor="form-register__first-name">Имя</label>
          <input type="text" 
            value={user.first_name}
            onChange={e => setUserFirstname(e.target.value)}
          />
        </div>
        <div className="form-group">
        <label htmlFor="form-register__last-name">Фамилия</label>
          <input type="text" 
            value={user.last_name}
            onChange={e => setUserLastname(e.target.value)}
          />
        </div> 
        <div className="form-group">
        <label htmlFor="form-register__email">Эл. почта</label>
          <input type="email" 
            value={user.email}
            onChange={e => setUseremail(e.target.value)}
          />
        </div> 
        <div className="form-group">
        <label htmlFor="form-register__password">Пароль</label>
          <input type="password" 
            value={user.password}
            onChange={e => setUserpassword(e.target.value)}
          />
        </div>              
        <button className="btn form__btn">Регистрация</button>
      </form>
  )
}