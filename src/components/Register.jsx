import { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/Register.css'

function Register ({closeModal}) {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    repeatedPassword: "",
    birthDate: "",
  })
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:8080/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
      const data = await res.json()
      dispatch({type: 'LOGIN', user: data})
      console.log(data)
      closeModal()
    } else {
      alert('parece que algo salio mal')
      const data = await res.json()
      console.log(data)
    }
  }

  const updateField = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })
  }

  return <div className="modal-bg">
    <form className="modal-fg" onSubmit={handleSubmit}>
      <label>
        First name:
        <input type="text" 
          value={userData.firstName} 
          name="firstName"
          onChange={updateField}
        />
      </label>
      <label>
        Last name:
        <input type="text" 
          value={userData.lastName} 
          name="lastName"
          onChange={updateField}
        />
      </label>
      <label>
        Username:
        <input type="text" 
          placeholder="username or email..."
          value={userData.username}
          name="username"
          onChange={updateField}
        />
      </label>
      <label>
        email
        <input type="email"
          value={userData.email}
          name="email"
          onChange={updateField}
        />
      </label>
      <label>
        Password:
        <input type="password"
          value={userData.password}
          name="password"
          onChange={updateField}
        />
      </label>
      <label>
        Repeat your password:
        <input type="password"
          value={userData.repeatedPassword}
          name="repeatedPassword"
          onChange={updateField}
        />
      </label>
      <label>
        Birth date:
        <input type="date"
          value={userData.birthDate}
          name="birthDate"
          onChange={updateField}
        />
      </label>
      <button>Register</button>
    </form>
    <button onClick={closeModal}>x</button>
  </div>
}

export default Register;
