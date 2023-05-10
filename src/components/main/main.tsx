import { useContext } from 'react';
import { UserContext } from '../../context';
import PopupSign from '../popup-sign/popupSign';
import PageLayout from '../page-layout/pageLayout';
import css from './main.module.css'

function Main() {

  const {
    authorization,
  } = useContext(UserContext)

  return (
    <main className={css.main}>
      <div className={css.main_content}>
        {!authorization
          ? <PopupSign />
          : <PageLayout />
        }
      </div>
    </main>
  );
}
  
export default Main;
  