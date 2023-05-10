import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import { IFriends } from '../../types/types';
import { URL_IMG } from '../../config';
import css from './friends.module.css'

function Friends() {

  const {
    user,
    token,
  } = useContext(UserContext)

  const [friend, setFriend] = useState<IFriends[]>()

  useEffect(()=> {
    const method = 'get'
    
    const url = 'friends'

    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    
    const option = {
        method: method,
        url: url,
        headers: headers,
    }

    request(option).then (response => {
      setFriend(response.data)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }, [])

  const deleteFriend = (id, index) => {
    const method = 'delete'
    
    const url = `friends/${id}`

    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    
    const option = {
        method: method,
        url: url,
        headers: headers,
    }

    request(option).then (response => {
      setFriend(friend?.filter((_,i) => i !== index))
    }).catch(error => {
      alert(error.response.data.message)
    })
  }

  return (
    <div className={css.friends_list}>
      {friend?.length !== 0
        ?
          <>
            {friend?.map((friend, i) => {
              return (
                <div key={friend.id}>
                  {friend.user?.id === user.id
                    ?
                      <div className={css.friend}>
                        <Link to={`/user/${friend.user2?.id}`} className={css.link}>
                          <div className={css.info_friend}>
                            <img src={URL_IMG + friend.user2?.img} alt="Аватарка" className={css.avatar_img}/>
                            <p>{friend.user2?.name}</p>
                          </div>
                        </Link>
                        <div className={css.buttons}>
                          <button onClick={() => deleteFriend(friend.id, i)}>Удалить</button>
                        </div>
                      </div>
                    :
                      <div className={css.friend}>
                        <Link to={`/user/${friend.user?.id}`} className={css.link}>
                          <div className={css.info_friend}>
                            <img src={URL_IMG + friend?.user?.img} alt="Аватарка" className={css.avatar_img}/>
                            <p>{friend.user?.name}</p>
                          </div>
                        </Link>
                        <div className={css.buttons}>
                          <button onClick={() => deleteFriend(friend.id, i)}>Удалить</button>
                        </div>
                      </div>
                  }
                </div>
              )
            })}
          </>
        : 
          <div className={css.not_friend}>
            <p>У вас нет друзей</p>
          </div>
      }
    </div>
  );
}
  
export default Friends;
  