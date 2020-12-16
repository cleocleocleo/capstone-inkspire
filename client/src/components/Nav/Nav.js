import './Nav.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useUserInfo from '../../hooks/useUserInfo';
import userIcon from '../../assets/icons/user.svg';
import { logout } from '../../helpers/auth';

const Nav = () => {
    const [profilePic, setProfilePic] = useState(userIcon);
    const { userInfo } = useUserInfo();

    useEffect(() => {
        userInfo.username
            ? setProfilePic(userInfo.profileImg)
            : setProfilePic(userIcon);
    }, [userInfo.username, userInfo.profileImg])

    const logoutLink = !userInfo
        ? "nav__link nav__link--hidden"
        : "nav__link";

    return ( 
        <header>
            <nav className="nav">
                
                    <h1 className="nav__title">
                        <Link to="/">
                            Inkspire
                         </Link>
                    </h1>
                <div className="nav__list">
                    <h4 className="nav__link"><Link to="/profile">Profile</Link></h4>
                    <h4 className="nav__link"><Link to="/search">Search</Link></h4>
                    <h4 className={logoutLink} onClick={logout}>Sign out</h4>
                    <Link to="/profile">
                        <div className="nav__profile-container">
                                <img className="nav__profile-img"
                                src={profilePic} alt=""/>
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
 
export default Nav;