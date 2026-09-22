import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"
import { login, register, getMe, logout } from "../services/auth.api"


export const useAuth = () => {

    const context = useContext(AuthContext);

    const { loading, setLoading, user, setUser } = context;

    const handleRegister = async (username, email, password) => {
        setLoading(true)

        try {
            const data = await register(username, email, password);
            setUser(data.user)
        }
        catch (err) {
            throw err;
        }
        finally {
            setLoading(false);
        }

    }

    const handleLogin = async (username, password) => {
        setLoading(true)

        try {
            const data = await login(username, password)
            setUser(data.user);
        }
        catch (err) {
            throw err;
        }
        finally {
            setLoading(false);
        }
    }

    const handleGetMe = async () =>{
        setLoading(true)

        const data = await getMe();
        setUser(data.user);
        
        setLoading( false)
        
    }

    const handleLogout = async () =>{
        

        setLoading(true)

        const data = await logout();
        setUser(data.user)

        setLoading(false)
    }
    
    useEffect( ()=>{
         handleGetMe();
    },[])

    return(
        {loading, user, handleRegister, handleLogin, handleGetMe, handleLogout}
    )
}