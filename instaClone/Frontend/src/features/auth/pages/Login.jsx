import React, { useState } from 'react'
import { Link } from 'react-router'
import '../styles/form.scss'
import { useNavigate } from 'react-router'

import useAuth from '../hooks/useAuth'

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { handleLogin, loading, user } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(username, password);
    navigate("/")
    console.log("user LoggedIn")

  }
  if (loading) {
    return <main><h1>Loading...</h1></main>
  }


  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => { setUsername(e.target.value) }}
            type="text"
            name='username'
            id='username'
            placeholder='Enter username' />

          <input
            onInput={(e) => { setPassword(e.target.value) }}
            type="password"
            name='password'
            id='password'
            placeholder='Enter password' />
          <button className='btn primary-btn' type='submit'>Login</button>
        </form>
        <p>Don't have an account ? <Link to='/register' >Create here.</Link> </p>
      </div>
    </main>
  )
}

export default Login