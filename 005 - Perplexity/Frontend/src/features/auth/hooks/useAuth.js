import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../auth.slice";

import { login, register, getMe } from "../services/auth.api"

export const useAuth = () => {

    const dispatch = useDispatch();


    const handleLogin = async ({ username, password }) => {
        try {

            dispatch(setLoading(true));

            const data = await login({ username, password });
            dispatch(setUser(data.user)); 
        }
        catch (err) {
            console.log("Error at handleLogin useAuth", err)
            dispatch(setError(error.response?.data?.message || "Registration failed"))
        }
        finally {
            dispatch(setLoading(false))
        }


    }

    const handleRegister = async ({ username, email, password }) => {

        try {
            dispatch(setLoading(true))

            const data = await register({ username, email, password })
            // dispatch(setUser(data.user));//user nahi milega kyonki EMAIL send kr rahe hai verify ke liye
        }
        catch (err) {
            console.log('Error at handleRegister useAuth', err)
            dispatch(setError(error.response?.data?.message || "Logged In failed"))
        }

        finally {
            dispatch(setLoading(false))
        }
    }


    const handleGetMe = async () => {
        try {
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.user));
        }
        catch (error) {
            dispatch(setError(error.response?.data?.message || "Logged In failed"))
        }
        finally {
            dispatch(setLoading(false))
        }
    }

    return ({ handleLogin, handleRegister, handleGetMe})
}