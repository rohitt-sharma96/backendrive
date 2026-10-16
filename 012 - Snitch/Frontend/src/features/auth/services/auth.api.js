import axios from 'axios'

const api = axios.create({
    baseURL: "/api/auth",
    withCredentials: true
})



export const register = async ({ email, fullname, contact, password, isSeller }) => {
    //http://localhost:5173/api/auth/register
    const response = await api.post("/register", {
        email,
        fullname,
        contact,
        password,
        isSeller

    })

    return response.data;
}


export const login = async ({ email, password }) => {
    //http://localhost:5173/api/auth/login
    const response = await api.post("/login", {
        email,
        password
    })

    return response.data;
}