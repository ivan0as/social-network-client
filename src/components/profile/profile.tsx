import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context';
import { useParams } from 'react-router-dom';
import { request } from '../../requests';
import { IUser, IPost } from '../../types/types';
import { URL_IMG } from '../../config';
import Posts from '../posts/posts';
import css from './profile.module.css';

function Profile(props) {

    const { 
        eventListenerScroll, 
        increasingPostLimits,
        setFetching,
        setMaxLimit,
        limit,
        fetching
    } = props

    const {
        user,
        token,
    } = useContext(UserContext)

    const {id} = useParams()

    const emptyObject = {
        text: '',
        img: ''
    }

    const [profile, setProfile] = useState<IUser>()

    const [addPost, setAddPost] = useState<IPost>(emptyObject)

    const [posts, setPosts] = useState<IPost[]>([])

    const requestGetPosts = (limitPost=10) => {
        const method = 'get'

        const url = `post/${id}?limit=${limitPost}`

        const option = {
            method: method,
            url: url
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
        const method = 'get'
    
        let url = `user/${id}`
    
        let option = {
            method: method,
            url: url
        }
    
        request(option).then (response => {
            setProfile(response.data)
        }).catch(error => {
          console.log(error.toJSON())
        })

        requestGetPosts()

    }, [id])

    const handleChange = event => {
		const fieldName = event.target.name
		setAddPost({...addPost, [fieldName]: event.target.value})
	}

    const selectFile = event => {
        const fieldName = event.target.name
        const file = event.target.files[0]
        setAddPost({...addPost, [fieldName]: file})
    }

    const handleSubmit = event => {
        event.preventDefault()

        const method = 'post'

        const url = `post`

        const headers = {
            'Authorization': `Bearer ${token}`,
        }

        const formData = new FormData()

        for (let key in addPost) {
            formData.append(key, addPost[key])
        }

        const data = formData
        
        const option = {
            method: method,
            url: url,
            headers: headers,
            data: data
        }

        request(option).then (response => {
            setAddPost(emptyObject)
            const addPostFeed = response.data
            setPosts(addPostFeed.concat(posts))
        }).catch(error => {
            console.log(error.toJSON())
            alert(error.response.data.message)
        })
    }

    useEffect(() => {
        if (increasingPostLimits()) {
            requestGetPosts(limit + 10)
        }
    }, [fetching])

    useEffect(() => {
        eventListenerScroll()
    }, [])

    const friendRequest = () => {
        const method = 'post'

        const url = 'confirmFriend/request_friendship'

        const headers = {
            'Authorization': `Bearer ${token}`,
        }

        const data = {
            user2Id: profile?.id
        }
            
        const option = {
            method: method,
            url: url,
            headers: headers,
            data: data
        }

        request(option).then (response => {
            alert('Запрос дружбы отправлен')
        }).catch(error => {
            console.log(error.toJSON())
            alert(error.response.data.message)
        })
    }

    return (
        <div className={css.profile}>
            <div className={css.profile_header}>
                <div className={css.info_profile}>
                    <img src={URL_IMG + profile?.img} alt="Аватарка" className={css.avatar_img}/>
                    <div className={css.text_info_profile}>
                        <div className={css.names}>
                            <p>{profile?.name}</p>
                            <p>Возраст: {profile?.age}</p>
                        </div>
                        <div className={css.additional_info}>
                            <p>Город: {profile?.city?.name}</p>
                            <p>Университет: {profile?.university?.name}</p>
                        </div>
                    </div>
                </div>
                {profile?.id !== user.id && (
                    <button className={css.btn_friend} onClick={friendRequest}>Добавить в друзья</button>
                )}
            </div>
            {profile?.id === user.id &&(
                <form className={css.form_add_post} onSubmit={handleSubmit}>
                    <label className={css.label_textarea}>Пост<textarea  name={'text'} value={addPost?.text} onChange={handleChange}/></label>
                    <label className={css.input_file}><input type="file" accept="image/*" name={'img'} onChange={selectFile}/><span>Выберите файл</span></label>
                    <button className={css.btn_add_post} type='submit'>Отправить</button>
                </form>
            )}
            <div className={css.posts}>
                <Posts posts={posts} setPosts={setPosts}/>
            </div>
        </div>
    );
}

export default Profile;
