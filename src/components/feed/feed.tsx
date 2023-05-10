import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import { IPost } from '../../types/types';
import { request } from '../../requests';
import Posts from '../posts/posts';
import css from './feed.module.css';

function Feed(props) {

    const { 
        eventListenerScroll, 
        increasingPostLimits,
        setFetching,
        setMaxLimit,
        limit,
        fetching
    } = props

    const {
        token
    } = useContext(UserContext)

    const [posts, setPosts] = useState<IPost[]>([])

    const requestGetPosts = (limitPost=10) => {
        const method = 'get'

        const url = `post?limit=${limitPost}`

        const headers = {
            'Authorization': `Bearer ${token}`,
        }

        const option = {
            method: method,
            url: url,
            headers: headers
        }

        request(option).then (response => {
            setPosts(response.data.rows)
            setMaxLimit(response.data.count)
            setFetching(false)
        }).catch(error => {
          console.log(error.toJSON())
        })

    }

    useEffect(() => {
        requestGetPosts()
    }, [])

    useEffect(() => {
        if (increasingPostLimits()) {
            requestGetPosts(limit + 10)
        }
    }, [fetching])

    useEffect(() => {
        eventListenerScroll()
    }, [])

    return (
        <div className={css.feed}>
            <Posts posts={posts} setPosts={setPosts}/>
        </div>
    );
}

export default Feed;
