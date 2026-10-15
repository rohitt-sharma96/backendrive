import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        name:'register',
        path:"/register",
        element: <h1>Register</h1>
    },
    {
        name:'login',
        path:"/login",
        element: <h1>Login</h1>
    },

])