import { useState } from 'react'
import { useDispatch } from 'react-redux'
import '../styles/Login.css'



function Login ({closeModal}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await fetch('http://localhost:8080/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    console.log(res)
    if (res.ok) {
      const data = await res.json()
      dispatch({type: 'LOGIN', user: data})
      closeModal()
    } else {
      alert('parece que algo salio mal')
    }
  }

  return <div className="modal-bg">
    <form className="modal-fg" onSubmit={handleSubmit}>
      <label>
        User
        <input type="text" placeholder="username or email..." value={username} onChange={e => setUsername(e.target.value)}/>
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </label>
      <button>LOGIN</button>
    </form>
    <button onClick={closeModal}>X</button>
  </div>
}

export default Login