import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IUser } from './types/types';
import { UserContext } from './context';
import { request } from './requests';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';
import Loading from './components/loading/loading';
import css from './App.module.css'

function App() {

  type IToken = null | string

  const [user, setUser] = useState<IUser | null>()
  const [token, setToken] = useState<IToken>(null)
  const [authorization, setAuthorization ] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect (() => {
    const method = 'get'
    
    const url = 'user/auth'
    
    const getToken = window.localStorage.getItem('token')
  
    const headers = {
      'Authorization': `Bearer ${getToken}`
    }
  
    const option = {
      method: method,
      url: url,
      headers: headers
    }

    if (getToken) {
      if (!authorization) {
          request(option).then (responseData => {
          setUser(responseData.data.user)
          setLoading(true)
        }).catch(error => {
          if (error.toJSON().status !== 401) {
            console.log(error.toJSON())
          }
          localStorage.removeItem('token')
          setLoading(true)
        })
        setToken(getToken)
      }
    } else {
      setLoading(true)
    }
  }, [authorization])

  useEffect (() => {
    if (token) {
      window.localStorage.setItem('token', token)
    }
  }, [token])
  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{
        user,
        setUser,
        token,
        setToken,
        authorization,
        setAuthorization,
      }}>
        {loading
          ?
            <div className={css.app}>
              <Header />
              <Main />
              <Footer />
            </div>

          :
            <div className={css.loading}>
              <Loading />
            </div>
        }
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
