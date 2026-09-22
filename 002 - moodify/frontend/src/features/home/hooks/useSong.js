import { useContext } from "react";
import { SongContext } from "../song.context";

import {getSong, uploadSong} from "../services/song.api"


const useSong = async() =>{

    const context = useContext(SongContext)
    const { loading, setLoading, song, setSong} = context;

    const handleGetSong = async ({mood}) =>{
        setLoading(true);

        try{
            const data = await getSong({mood})
            setSong(data.song)
        }
        catch(err){
            console.log("handleGetSong",err);
        }
        finally{
            setLoading(false);
        }
    }

    const handleUploadSong = async ({song}) =>{
        setLoading(true)

        try{
            const data = await uploadSong({song})
            setSong(data.song);
        }
        catch(err){
            console.log("handleUploadSong", err)
        }
        finally{
            setLoading(false)
        }
    }


    return({handleGetSong, handleUploadSong})
}