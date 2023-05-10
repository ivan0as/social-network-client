import { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import { NAMESITE, URL_IMG } from '../../config';
import TopProfileMenu from '../top-profile-menu/topProfileMenu';
import css from './header.module.css';

function Header() {

  const {
    authorization,
    user,
  } = useContext(UserContext)

  const [formVisible, setFormVisible] = useState<boolean>(false)

  const [search, setSearch] = useState<string>('')

  const navigate = useNavigate()

  const menuBurgerButton = useRef(null)

  const catalogMenuSwitch = () => {
    setFormVisible(!formVisible)
  }

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    if (search) {
      navigate(`user_search/?name=${search}`)
    } else {
      alert('Поле не должно быть пустым')
    }
    
  }

  return (
    <header className={css.header}>
      <div className={css.header_content}>
        <h1 className={css.name_site}>{NAMESITE}</h1>
        {authorization && (
          <>
            <form className={css.form_search} onSubmit={handleSubmit}>
              <label><span>Поиск</span><input placeholder="Введите имя" value={search} onChange={handleChange}/></label>
            </form>
            <div className={css.header_authorization}>
              <button className={css.button_menu} onClick={catalogMenuSwitch} ref={menuBurgerButton}>
                <img src={URL_IMG+user.img} alt="Аватарка" className={css.img}/>
                <p>{'>'}</p>
              </button>
              {formVisible &&(
                <TopProfileMenu formVisible={formVisible} setFormVisible={setFormVisible} menuBurgerButton={menuBurgerButton} catalogMenuSwitch={catalogMenuSwitch}/>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
