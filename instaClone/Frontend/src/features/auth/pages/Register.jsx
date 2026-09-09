import React, { useState } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

import useAuth from '../hooks/useAuth'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate();

  const { handleRegister, loading, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault()

    await handleRegister(username, email, password);
    navigate("/")

    console.log("user registered successfully")
  }

  if (loading) {
    return <main>
      Loading...
    </main>
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

          <input
            onInput={(e) => { setUsername(e.target.value) }}
            type="text"
            name='username'
            id='username'
            placeholder='Enter username here' />
          <input
            onInput={(e) => { setEmail(e.target.value) }}
            type="email"
            name='email'
            id='email'
            placeholder='Enter email here' />
          <input
            onInput={(e) => { setPassword(e.target.value) }}
            type="password"
            name='password'
            id='password'
            placeholder='Enter password here' />
          <button className='btn primary-btn' type='submit'>Login</button>
        </form>
        <p>Already have an account ? <Link to='/login' >Login here.</Link> </p>
      </div>
    </main>
  )
}

export default Register