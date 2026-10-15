import { register } from "../services/auth.api";
import { useDispatch } from "react-redux";
import { setError, setLoading, setUser } from "../state/auth.slice";
import { createLogger } from "vite";



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


    return { handleRegister }
}
