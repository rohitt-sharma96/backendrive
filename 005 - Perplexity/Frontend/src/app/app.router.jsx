import { createBrowserRouter } from 'react-router'
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/chat/pages/Dashboard';
import Protected from '../features/auth/components/Protected';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Protected>
            <Dashboard />
        </Protected>,

        name: 'home-page'
    },
    {
        path: '/login',
        element: <Login />,
        name: 'login-page'
    },
    {
        path: '/register',
        element: <Register />,
        name: 'register-page'
    }
]);



