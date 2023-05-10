import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';
import { request } from '../../requests';
import { IConfirmFriend } from '../../types/types';
import { URL_IMG } from '../../config';
import css from './confirmFriend.module.css'

function ConfirmFriend() {

  const {
    token,
  } = useContext(UserContext)

  const [confirmFriends, setConfirmFriends] = useState<IConfirmFriend[]>()

  useEffect(()=> {
    const method = 'get'
    
    const url = 'confirmFriend'

    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    
    const option = {
        method: method,
        url: url,
        headers: headers,
    }

    request(option).then (response => {
      setConfirmFriends(response.data)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }, [])

  const confirmApplication = (id, index) => {
    const method = 'post'
    
    const url = `confirmFriend/acceptance/${id}`

    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    
    const option = {
        method: method,
        url: url,
        headers: headers,
    }

    request(option).then (response => {
      setConfirmFriends(confirmFriends?.filter((_,i) => i !== index))
    }).catch(error => {
      alert(error.response.data.message)
    })
  }

  const deleteApplication = (id, index) => {
    const method = 'delete'
    
    const url = `confirmFriend/acceptance/${id}`

    const headers = {
      'Authorization': `Bearer ${token}`,
    }
    
    const option = {
        method: method,
        url: url,
        headers: headers,
    }

    request(option).then (response => {
      setConfirmFriends(confirmFriends?.filter((_,i) => i !== index))
    }).catch(error => {
      alert(error.response.data.message)
    })
  }

  return (
    <div className={css.confirm_friend_list}>
      {confirmFriends?.length !== 0
        ?
          <>
            {confirmFriends?.map((confirmFriend, i) => {
              return (
                <div className={css.confirm_friend} key={confirmFriend.id}>
                  <Link to={`/user/${confirmFriend.user?.id}`} className={css.link}>
                    <div className={css.info_confirm_friend}>
                      <img src={URL_IMG + confirmFriend?.user?.img} alt="Аватарка" className={css.avatar_img}/>
                      <p>{confirmFriend.user?.name}</p>
                    </div>
                  </Link>
                  <div className={css.buttons}>
                    <button onClick={() => confirmApplication(confirmFriend.id, i)}>Подтвердить</button>
                    <button onClick={() => deleteApplication(confirmFriend.id, i)}>Удалить</button>
                  </div>
                </div>
              )
            })}
          </>
        : 
          <div className={css.not_confirm_friend}>
            <p>У вас нет заявок</p>
          </div>
      }
    </div>
  );
}
  
export default ConfirmFriend;
  