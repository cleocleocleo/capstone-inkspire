import './Nav.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useUserInfo from '../../hooks/useUserInfo';
import userIcon from '../../assets/icons/user.svg';
import { auth } from '../../services/firebase';

const Nav = () => {
    const [user] = useState(auth().currentUser);
    const { userInfo } = useUserInfo(user.uid);

    const checkUser = () => {
        if (userInfo.profileImg) {
            return userInfo.profileImg
        } else {
            return userIcon
        }
    }

    return ( 
        <header>
            <nav className="nav">
                <Link to="/">
                    <h1 className="nav__title">Inkspire</h1>
                </Link>
                <div className="nav__list">
                    <Link to="/profile"><h4 className="nav__link">Profile</h4></Link>
                    <Link to="/search"><h4 className="nav__link">Search</h4></Link>
                    <Link to="/profile">
                        <div className="nav__profile-container">
                                <img className="nav__profile-img"
                                src={checkUser()} alt=""/>
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
 
export default Nav;