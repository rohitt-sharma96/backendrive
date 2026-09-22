import { useContext } from "react";
import { PostContext } from "../post.context";

import { getFeed, createPost, likePost, unlikePost } from "../services/post.api";


export const usePosts = () => {

    const context = useContext(PostContext);
    const { loading, setLoading, post, feed, setFeed } = context;

    const handleGetFeed = async () => {

        setLoading(true)
        try {
            const response = await getFeed();
            setFeed(response.posts)

        } finally {
            setLoading(false)
        }

    }

    const handleCreatePost = async (imageFile, caption) => {
        setLoading(true);
        try {
            const data = await createPost(imageFile, caption);
            setFeed([data.post, ...feed]);
        }
        catch (err) {
            throw err
        }
        finally {
            setLoading(false);
        }
    }

    const handleLikePost = async (post) => {

        const data = await likePost(post);
        await handleGetFeed();

    }
    const handleUnlikePost = async (post) => {

        const data = await unlikePost(post);
        await handleGetFeed();

    }

    return (
        { handleGetFeed, loading, feed, post, handleCreatePost, handleLikePost, handleUnlikePost }
    )
}



