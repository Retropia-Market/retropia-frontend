import '../styles/Login.css'



function Login ({closeModal}) {

  const handleSubmit = () => {
    {} // handler ....
  }

  return <div className="modal-bg">
    <form className="modal-fg" onSubmit={handleSubmit}>
      <label>
        User
        <input type="text" placeholder="username or email..."/>
      </label>
      <label>
        Password
        <input type="text"/>
      </label>
      <button>LOGIN</button>
    </form>
    <button onClick={closeModal}>X</button>
  </div>
}

export default Login