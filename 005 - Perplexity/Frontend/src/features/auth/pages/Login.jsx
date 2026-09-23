import { useState } from 'react'
import { Link, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

import { useSelector } from 'react-redux'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {handleLogin,} = useAuth()
    const navigate = useNavigate();
   
    const user = useSelector((state)=> state.auth.user)
    const loading = useSelector((state) => state.auth.loading)

    const submitHandler = async (event) => {
        event.preventDefault()
        const info = {username, password}

        await handleLogin(info)

        console.log('Login submitted:')
        navigate("/")
    }

    if(!loading && user){
        return <Navigate to={"/"} replace />
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl shadow-slate-950/30">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Welcome back</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Sign in to your account</h1>
                    <p className="mt-2 text-sm text-slate-500">Enter your details to continue.</p>
                </div>

                <form className="space-y-5" onSubmit={submitHandler}>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="login-username">
                            Username
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
                            id="login-username"
                            name="username"
                            onChange={(e)=> setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            type="text"
                            value={username}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="login-password">
                            Password
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
                            id="login-password"
                            name="password"
                            onChange={(e)=> setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            type="password"
                            value={password}
                        />
                    </div>

                    <button
                        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
                        type="submit"
                    >
                        Sign in
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Don&apos;t have an account?{' '}
                    <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/register">
                        Create one
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default Login