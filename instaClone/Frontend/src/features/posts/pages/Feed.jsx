import Post from '../components/Post';
import '../style/feed.scss';

import { usePost } from '../hooks/usePosts';
import { useEffect } from 'react';

const Feed = () => {

    const { handleGetFeed, loading, feed } = usePost();

    useEffect(() => {
        handleGetFeed();
        console.log("post fetched")
    }, [])


    if (loading) {
        return (
            <main>
                <h1>Feed is Loading...</h1>
            </main>
        )
    }
    console.log(feed)


    return (
        <main className="feed-page">
            <div className="feed">
                <div className="posts">

                    {feed.map((post) => {
                        return <Post user={post.userId} post={post} />
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed