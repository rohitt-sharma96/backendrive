import React,{useState,useRef} from 'react'
import '../style/createpost.scss';

import {usePosts} from '../hooks/usePosts';
import { useNavigate } from 'react-router';

const CreatePost = () => {

    const {handleCreatePost, loading} = usePosts();
     
    
    const navigate = useNavigate();
    

    const [caption, setCaption] = useState("")

    const postImageInputRef = useRef();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const file = postImageInputRef.current.files[0];

        await handleCreatePost(file, caption)
        console.log("post created successfully")
        navigate("/feed")
    }
    if(loading){
        return(
            <main>
                <h1>creating post...</h1>
            </main>
        )
    }
    
  return (
  <main className="create-post-page">
    <div className="form-container">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit}>
            <label className='create-post-label' htmlFor="postImage">Select Image</label>
            <input ref={postImageInputRef} hidden type="file" name='postImage' id='postImage'  />
            <input 
            value={caption}
            onInput={(e)=>{setCaption(e.target.value)}}
            type="text" 
            name='caption' 
            id='caption' />

            <button type='submit' className='btn primary-btn'>Create post</button>
        </form>
    </div>
  </main>
  )
}

export default CreatePost
