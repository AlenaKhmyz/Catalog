import { useState } from 'react';
import userImg from '../../img/user.svg';
import arrowDownImg from '../../img/arrow-down.svg';
import arrowUpImg from '../../img/arrow-up.svg';
import '../../styles/styles.scss';

const UserMenu = () => {
  const [userMenuOpened, setUserMenu] = useState(false);
  const onUserMenuClick = () => {
    setUserMenu(!userMenuOpened);
  };
  return (
    <div className="user">
      <div className="user__components">
        <img src={userImg} className="user__components__img" />
        <p className="user__components__name">Alexander Borisenko</p>
        <button className="user__button" onClick={onUserMenuClick}>
          <img src={userMenuOpened ? arrowUpImg : arrowDownImg} className="user__button__img" />
        </button>
      </div>
      {userMenuOpened && (
        <div className="user__menu">
          <div className="user__menu__buttons">
            <button className="user__menu__buttons__btn">Logout</button>
            <button className="user__menu__buttons__btn">Change user</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
