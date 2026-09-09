import { useContext } from "react";
import { PostContext } from "../post.context";

import { getFeed } from "../services/post.api";


export const usePost = () => {

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
    return (
        { handleGetFeed, loading, feed, post }
    )
}



