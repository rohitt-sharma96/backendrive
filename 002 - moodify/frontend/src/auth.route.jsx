import {createBrowserRouter} from 'react-router';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';
import Protected from './features/auth/components/Protected';
import Home from './features/home/pages/Home'


export const router = createBrowserRouter([
    {
        path: '/register',
        element:<Register />,
        name : 'register'
    },
    {
        path: '/login',
        element: <Login />,
        name: 'login'
    }, 
    {
        path: '/',
        element: <Protected><Home /></Protected>,
        name: 'Home'
    }
])