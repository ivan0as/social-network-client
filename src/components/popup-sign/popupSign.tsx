import { useState, useEffect, useContext } from 'react';
import { ICity, IUniversity, IUser } from '../../types/types';
import { request } from '../../requests';
import { UserContext } from '../../context';
import Loading from '../loading/loading';
import css from './popupSign.module.css'

function PopupSign() {

  const {
    user,
    setUser,
    setToken,
    setAuthorization,
  } = useContext(UserContext)

  const [registrationSwither, setRegistrationSwither] = useState(false)

  const [loading, setLoading] = useState(false)

  const [cities, setCities] = useState<ICity[] | null>()

  const [universities, setUniversities] = useState<IUniversity[] | null>()

  const [login, setLogin] = useState<IUser>({
    login: '',
    password: ''
  })

  const [registration, setRegistration] = useState<IUser>({
    login: '',
    password: '',
    name: '',
    age: undefined,
    cityId: undefined,
    universityId: undefined,
    img: ''
  })

  const buttonSwitch = () => {
    setRegistrationSwither(!registrationSwither)
  }

  useEffect(() => {
    const method = 'get'
    
    let url = 'city'
    
    let option = {
        method: method,
        url: url
    }

    request(option).then (responseData => {
      setCities(responseData.data)
    }).catch(error => {
      alert(error.response.data.message)
    })

    url = 'university'
    
    option = {
        method: method,
        url: url
    }

    request(option).then (responseData => {
      setUniversities(responseData.data)
    }).catch(error => {
      alert(error.response.data.message)
    })

  }, [])

  useEffect(() => {
    if (cities && universities) {
      setLoading(true)
    }
  }, [cities, universities])

  const handleChangeLogin = (event) => {
    const fieldName = event.target.name
    setLogin({...login, [fieldName]: event.target.value})
  }

  const handleChangeRegistration = (event) => {
    const fieldName = event.target.name
    setRegistration({...registration, [fieldName]: event.target.value})
  }

  const selectFile = e => {
    const fieldName = e.target.name
    const file = e.target.files[0]
		setRegistration({...registration, [fieldName]: file})
  }

  const loginSubmit = (event) => {
    event.preventDefault()

    const method = 'post'
    
    const url = 'user/login'

    const data = login
    
    const option = {
        method: method,
        url: url,
        data: data
    }

    request(option).then (responseData => {
      setToken(responseData.data.token)
      setUser(responseData.data.user)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }

  const registrationSubmit = (event) => {
    event.preventDefault()

    const method = 'post'
    
    const url = 'user/registration'

    const formData = new FormData()

    for (let key in registration) {
      formData.append(key, registration[key])
    }

    const data = formData
    
    const option = {
        method: method,
        url: url,
        data: data
    }

    request(option).then (responseData => {
      setToken(responseData.data.token)
      setUser(responseData.data.user)
    }).catch(error => {
      alert(error.response.data.message)
    })
  }

  useEffect(() => {
    if (user) {
        setAuthorization(true)
    } else {
        setAuthorization(false)
    }
  }, [user, setAuthorization])

  return (
    <div className={css.main}>
     <div className={css.main_content}>
      {loading
        ? <>
            {!registrationSwither
              ? <form className={css.form} onSubmit={loginSubmit}>
                  <label>Логин<input name="login" value={login?.login} onChange={handleChangeLogin}/></label>
                  <label>Пароль<input type="password" name="password" value={login?.password} onChange={handleChangeLogin}/></label>
                  <button type='submit' className={`${css.btn} ${css.btn_type}`}>Войти</button>
                  <button className={css.btn} onClick={buttonSwitch}>Регистрация</button>
                </form>
              : <form className={css.form} onSubmit={registrationSubmit}>
                  <label>Логин<input name='login' value={registration.login} onChange={handleChangeRegistration}/></label>
                  <label>Пароль<input type="password" name='password' value={registration.password} onChange={handleChangeRegistration}/></label>
                  <label>Имя<input  name='name' value={registration.name} onChange={handleChangeRegistration}/></label>
                  <label>Возраст<input  name='age' value={registration.age} onChange={handleChangeRegistration}/></label>
                  <label>Город<select name='cityId' value={registration.cityId} onChange={handleChangeRegistration}>
                    <option key={0} value={undefined}>{null}</option>
                    {cities
                      ? <>
                          {cities.map(city => {
                                return <option key={city.id} value={city.id}>{city.name}</option>
                          })}
                        </>
                      : null
                    }
                  </select></label>
                  <label>Университет<select name='universityId' value={registration.universityId} onChange={handleChangeRegistration}>
                    <option key={0} value={undefined}>{null}</option>
                    {universities
                      ? <>
                          {universities.map(university => {
                                return <option key={university.id} value={university.id}>{university.name}</option>
                          })}
                        </>
                      : null
                    }
                  </select></label>
                  <label className={css.input_file}>Фото пользователя<input type="file" accept="image/*" name={'img'} onChange={selectFile}/><span>Выберите файл</span></label>
                  <button type='submit' className={`${css.btn} ${css.btn_type}`}>Зарегистрироваться</button>
                  <button className={css.btn} onClick={buttonSwitch}>Авторизация</button>
                </form>
            }
          </>
        : <div className={css.loading}><Loading /></div>
      }
      
     </div>
    </div>
  );
}
  
export default PopupSign;
  