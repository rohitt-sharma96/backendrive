import { useState } from 'react'
import '../style/login.scss'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const navigate = useNavigate();
    const { loading, user, handleLogin } = useAuth();

    //Two way binding
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleLogin(username, password);
        console.log("logged in successful")
        navigate("/")

    }
    // if (loading) {
    //     return (
    //         <main>
    //             <h1>Loading...</h1>
    //         </main>
    //     )
    // }

    return (<>
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={username}
                        onInput={(e) => setUsername(e.target.value)}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter username" />
                    <input
                        value={password}
                        onInput={(e) => setPassword(e.target.value)}
                        type="password"
                        name='password'
                        id='password'
                        placeholder='Enter password' />
                    <button>Login</button>
                </form>
                <p>Don't have an Account ?<Link to={'/register'}>Create Here</Link> </p>
            </div >
        </main >
    </>
    )
}

export default Login
