import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { request } from '../../requests';
import { IUser } from '../../types/types';
import { URL_IMG } from '../../config';
import css from './userSearch.module.css'

function UserSearch() {

  const [searchParams, setSearchParams] = useSearchParams()

  const [users, setUsers] = useState<IUser[]>()

  useEffect(()=> {
    const currentParams = Object.fromEntries(searchParams)
    console.log(currentParams)

    const method = 'get'
    
    const url = `user/?name=${currentParams.name}`
    
    let option = {
        method: method,
        url: url
    }

    request(option).then (response => {
      setUsers(response.data.rows)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }, [searchParams])

  return (
    <div className={css.users}>
        {users?.map(user=>{
          return (
            <Link to={`/user/${user.id}`} className={css.link}>
              <div className={css.user}>
                <img src={URL_IMG + user.img} alt="Аватарка" className={css.user_img}/>
                <div className={css.user_info}>
                  <p className={css.user_name}>{user.name}</p>
                </div>
              </div>
            </Link>
          )
        })}
    </div>
  );
}
  
export default UserSearch;
  