import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import Feed from './features/posts/pages/Feed'


export const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login />,
        name:'login'
    },
    {
        path:'/register',
        element: <Register />,
        name: 'register',
    },
    {
        path:'/',
        element: <h1>Welcome to Home</h1>,
        name:'Home'
    },
    {
        path:'/feed',
        element: <Feed />,
        name: 'Feed'
    }
])