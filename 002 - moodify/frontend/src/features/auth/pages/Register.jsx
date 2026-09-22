
import {Link, useNavigate} from 'react-router';
import '../style/register.scss'
import {useAuth} from '../hooks/useAuth'
import { useState } from 'react';

const Register = () => {

    const navigate = useNavigate();
    const {loading, user, handleRegister} = useAuth();

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e) =>{
        e.preventDefault();

        await handleRegister(username, email, password);
        console.log("registered successful")
        navigate("/")
    }

  return (
    <>
    <main className="register-page">
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                onInput={(e)=>setUsername(e.target.value)}
                type="text" 
                name="username" 
                id="username" 
                placeholder="Enter username" />
                
                <input
                onInput={(e)=>setEmail(e.target.value)}
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter email" />

                <input
                onInput={(e)=>setPassword(e.target.value)}
                type="password" 
                name="password" 
                id="password" 
                placeholder="Enter password" />
                <button>Register</button>
            </form>
            <p>Already have an Account? <Link to={'/login'}>Login</Link></p>
        </div>
    </main>
    </>
  )
}

export default Register