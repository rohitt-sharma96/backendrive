import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";

export const router = createBrowserRouter([
    {
        name:'register',
        path:"/register",
        element:<Register /> 
    },
    {
        name:'login',
        path:"/login",
        element:<Login />
    },
    {
        name: 'default',
        path:"/",
        element:<h1>Home Page</h1>
    }

])