import { register, login } from "../services/auth.api";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../state/auth.slice";



export const useAuth = () => {
    const dispatch = useDispatch();

    const handleRegister = async ({ email, fullname, contact, password, isSeller = false }) => {
        dispatch(setLoading(true))

        try {
            const data = await register({ email, fullname, contact, password, isSeller })
            dispatch(setUser(data.user));
        }

        catch (err) {
            console.log("Error at handleRegister")
        }

        finally {
            dispatch(setLoading(false))
        }
    }

    const handleLogin = async ({ email, password }) => {
        dispatch(setLoading(true))

        try {
            const data = await login({ email, password })
            dispatch(setUser(data.user))
        }
        catch (err) {
            console.log("Error at handleLogin")
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    return { handleRegister, handleLogin }
}
