import { useContext } from "react";
import { AuthContext } from "../auth.context";

import { login, register } from "../services/auth.api";

const useAuth = () => {

    const context = useContext(AuthContext);
    const { loading, setLoading, user, setUser } = context;

    const handleLogin = async (username, password) => {
        setLoading(true);

        try {
            const response = await login(username, password)
            setUser(response.user);
        }
        catch (err) {
            throw err;
        }
        finally {
            setLoading(false);
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true);

        try {
            const response = await register(username, email, password);
            setUser(response.user);
        }
        catch(err){
            throw err;
        }
        finally{
            setLoading(false);
        }
    }

    return (
        {loading, user, handleLogin, handleRegister}
    );
}
export default useAuth;