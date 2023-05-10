import { useContext, useRef } from 'react';
import { UserContext } from '../../context';
import { useOutsideAlerter } from '../../utils';
import css from './topProfileMenu.module.css';

function TopProfileMenu(props) {

  const {formVisible, setFormVisible, menuBurgerButton, catalogMenuSwitch} = props

  const {
    user,
    setUser,
    setToken,
    setAuthorization
  } = useContext(UserContext)

  const menuBurger = useRef(null)

  useOutsideAlerter(menuBurger, menuBurgerButton, catalogMenuSwitch)

  const exit = () => {
    setUser(null)
    localStorage.removeItem('token')
    setToken(false)
    setAuthorization(false)
    setFormVisible(formVisible)
  }

  return (
    <div className={css.top_profile_menu} ref={menuBurger}>
        <ul>
            <li><p>{user.name}</p></li>
            <li><button>Настройки</button></li>
            <li><button onClick={exit}>Выход</button></li>
        </ul>
    </div>
  );
}

export default TopProfileMenu;
