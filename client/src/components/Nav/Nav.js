import './Nav.scss';
import { Link } from 'react-router-dom';
import useUserInfo from '../../hooks/useUserInfo';
import userIcon from '../../assets/icons/user.svg';
import { logout } from '../../helpers/auth';

const Nav = () => {
    const { userInfo } = useUserInfo();

    const checkUser = () => {
        if (userInfo) {
            return userInfo.profileImg
        } else {
            return userIcon
        }
    };

    const logoutLink = !userInfo
        ? "nav__link nav__link--hidden"
        : "nav__link";

    return ( 
        <header>
            <nav className="nav">
                <Link to="/">
                    <h1 className="nav__title">Inkspire</h1>
                </Link>
                <div className="nav__list">
                    <Link to="/profile"><h4 className="nav__link">Profile</h4></Link>
                    <Link to="/search"><h4 className="nav__link">Search</h4></Link>
                    <h4 className={logoutLink} onClick={logout}>Sign out</h4>
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