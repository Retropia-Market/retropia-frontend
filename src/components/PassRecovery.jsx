import { useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";


export function PassRecovery({setShow, setErrorMessage}) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    setErrorMessage('')
    const res = await fetch('http://localhost:8080/users/password-recovery', {
      method: 'POST',
      body: JSON.stringify({email: email}),
      headers: { 'Content-Type': 'application/json'},
    });
    if (res.ok){
      setSubmitted(true)
    }else{
      const data = await res.json()
      setErrorMessage(data.error)
    }
  }

  return <form 
      onSubmit={handleSubmit}
      onClick={e => e.stopPropagation()}
      >
        <h2>PASSWORD RECOVERY</h2>
        <p>Introduce the email for which you would like the password to be recovered</p>
        <div className="modal-inputs">
          <label htmlFor="email">Account Email</label>
          <div className="modal-field">
            <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
            <input 
              type="email"
              placeholder="email..."
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button className="modal-button">Send email</button>
        <FontAwesomeIcon  
          className="modal-go-back"
          onClick={() => setShow(false)}
          icon={faChevronLeft}></FontAwesomeIcon>
        {submitted && <p className="registration-submitted">
          If there is a user with address, an email will be sent for password recovery
        </p> }
    </form>
}