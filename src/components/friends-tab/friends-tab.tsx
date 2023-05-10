import { Routes, Route, Link } from 'react-router-dom';
import ConfirmFriend from '../confirm-friend/confirmFriend';
import Friends from '../friend/friends';
import css from './friendsTab.module.css'

function FriendsTab() {

  return (
    <div className={css.friends}>
        <ul className={css.tab}>
            <li>
                <Link to={'friend_list'} className={css.link}>
                    <button>Друзья</button>
                </Link>
            </li>
            <li>
                <Link to={'confirm_friend'} className={css.link}>
                    <button>Заявки</button>
                </Link>
            </li>
        </ul>
        <div className={css.friend_body}>
            <Routes>
                <Route path='friend_list' element={<Friends />} />
                <Route path='confirm_friend' element={<ConfirmFriend />} />
            </Routes>
        </div>
    </div>
  );
}
  
export default FriendsTab;
  