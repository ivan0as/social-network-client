import { useContext, useState } from 'react';
import { UserContext } from '../../context';
import { Routes, Route, Link } from 'react-router-dom';
import Profile from '../profile/profile'
import UserSearch from '../user-search/userSearch';
import FriendsTab from '../friends-tab/friends-tab';
import Feed from '../feed/feed';
import css from './pageLayout.module.css';

function PageLayout() {

    const {
        user,
    } = useContext(UserContext)

    const [limit, setLimit] = useState<number>(10)

    const [maxLimit, setMaxLimit] = useState<number>(10)

    const [fetching, setFetching] = useState<boolean>(false)

    const increasingPostLimits = () => {
        if (fetching && limit < maxLimit) {
            setLimit(limit+10)
            return true
        }
        return false
    }

    const eventListenerScroll = () => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }

    const scrollHandler = event => {
        if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }
    }

    return (
        <div className={css.page_layout}>
            <ul className={css.side_bar}>
                <li>
                    <Link to={`user/${user.id}`} className={css.link}>
                        <button>Моя страница</button>
                    </Link>
                </li>
                <li>
                    <Link to={'feed'}>
                        <button>Новости</button>
                    </Link>
                </li>
                <li><button>Мессенджер</button></li>
                <li>
                    <Link to={'friend/friend_list'} className={css.link}>
                        <button>Друзья</button>
                    </Link>
                </li>
            </ul>
            <div className={css.page_body}>
                <Routes>
                    <Route path='user/:id' element={<Profile 
                        eventListenerScroll={eventListenerScroll} 
                        increasingPostLimits={increasingPostLimits} 
                        setFetching={setFetching} 
                        setMaxLimit={setMaxLimit} 
                        limit={limit} 
                        fetching={fetching}
                    />} />
                    <Route path='user_search' element={<UserSearch />} />
                    <Route path='friend/*' element={<FriendsTab />} />
                    <Route path='feed' element={<Feed 
                        eventListenerScroll={eventListenerScroll} 
                        increasingPostLimits={increasingPostLimits} 
                        setFetching={setFetching} 
                        setMaxLimit={setMaxLimit} 
                        limit={limit} 
                        fetching={fetching}
                    />} />
                </Routes>
            </div>
        </div>
    );
}

export default PageLayout;
