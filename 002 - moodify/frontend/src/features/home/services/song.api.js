import axios from 'axios'


const api = axios.create({
    baseURL: "http://localhost:3000/api/songs",
    withCredentials: true
})


export const uploadSong = async({song}) =>{
    try{
        const response = await api.post("/",{
            song
        })
        return response.data;
    }
    catch(err){
        console.log("uploadSong failed:", err)
    }
}

export const getSong = async({mood}) =>{
    try{
        const response = await api.get("?mood=" + mood)
        return response.data;
    }
    catch(err){
        console.log("getSong failed:", err)
    }
}