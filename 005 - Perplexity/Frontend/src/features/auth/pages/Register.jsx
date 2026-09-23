import { useState } from 'react'
import { Link } from 'react-router'

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        //name = kon se field (eg. username) pe Input ho raha hai
        //value = kya Input ho raha hai (eg. test2)

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault()
        console.log('Registration submitted:', formData)
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl shadow-slate-950/30">
                <div className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Get started</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Create your account</h1>
                    <p className="mt-2 text-sm text-slate-500">Fill in your details to join us.</p>
                </div>

                <form className="space-y-5" onSubmit={submitHandler}>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="register-email">
                            Email
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
                            id="register-email"
                            name="email"
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            type="email"
                            value={formData.email}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="register-username">
                            Username
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
                            id="register-username"
                            name="username"
                            onChange={handleChange}
                            placeholder="Choose a username"
                            required
                            type="text"
                            value={formData.username}
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="register-password">
                            Password
                        </label>
                        <input
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
                            id="register-password"
                            name="password"
                            onChange={handleChange}
                            placeholder="Create a password"
                            required
                            type="password"
                            value={formData.password}
                        />
                    </div>

                    <button
                        className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
                        type="submit"
                    >
                        Create account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/login">
                        Sign in
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default Register