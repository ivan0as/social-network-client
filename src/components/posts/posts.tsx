import { useContext } from 'react';
import { UserContext } from '../../context';
import { request } from '../../requests';
import { URL_IMG } from '../../config';
import css from './posts.module.css';

function Posts(props) {

    const { posts, setPosts } = props

    const {
        user,
        token,
    } = useContext(UserContext)

    const likePost = (post) => {
        if (post.likes.find(item => item.userId === user.id)) {
            const method = 'delete'

            const url = `likes/${post.id}`

            const headers = {
                'Authorization': `Bearer ${token}`,
            }
            
            const option = {
                method: method,
                url: url,
                headers: headers
            }

            request(option).then (response => {
                const addLike = response.data
                
                setPosts(
                    posts?.map((obj, i)=>{
                        if (post.id === obj.id) {
                            obj!.likes!.map((objLike, j) => {
                                if (objLike.userId === user.id) {
                                    if (Array.isArray(obj!.likes)) {
                                        obj!.likes?.splice(j, 1)
                                    }
                                }
                            })
                        }

                        return obj
                    })
                )
            }).catch(error => {
                console.log(error.toJSON())
                alert(error.response.data.message)
            })
        } else {
            const method = 'post'

            const url = `likes/${post.id}`

            const headers = {
                'Authorization': `Bearer ${token}`,
            }
            
            const option = {
                method: method,
                url: url,
                headers: headers
            }

            request(option).then (response => {
                const addLike = response.data

                setPosts(
                    posts?.map((obj, i)=>{
                        if (post.id === obj.id) {
                            obj!.likes!.push(addLike)
                        }

                        return obj
                    })
                )
            }).catch(error => {
                console.log(error.toJSON())
                alert(error.response.data.message)
            })
        }
    }

    const likeRequest = (post) => {
        return(
            <button className={css.btn_like} onClick={()=> likePost(post)}>
                <div className={`
                ${css.like_img} 
                ${post.likes.find(item => item.userId === user.id) &&(
                    css.pressed_like
                )}`
            }></div>
                <span className={css.number_like}>{post.likes.length}</span>
            </button>
        )
    }

    return (
        <div className={css.posts}>
            {posts && (
                <>
                    {posts.map(post =>{
                        return (
                            <div className={css.post} key={post.id}>
                                {post.img && (
                                    <img src={URL_IMG + post.img} alt="Аватарка" className={css.img}/>
                                )}
                                <p>{post.text}</p>
                                {post && (
                                    <p className={css.like}>{likeRequest(post)}</p>
                                )}
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    );
}

export default Posts;
