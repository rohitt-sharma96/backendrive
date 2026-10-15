import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})



export const register = async ({ email, fullname, contact, password, isSeller }) => {

    const response = await api.post("/register", {
        email,
        fullname,
        contact,
        password,
        isSeller

    })

    return response.data;
}