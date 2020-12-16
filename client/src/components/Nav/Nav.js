import './Nav.scss';
import { Link } from 'react-router-dom';
import useUserInfo from '../../hooks/useUserInfo';
import userIcon from '../../assets/icons/user.svg';
import { logout } from '../../helpers/auth';

const Nav = () => {
    const { userInfo } = useUserInfo();

    const checkUser = () => {
        if (userInfo.username) {
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
                                src={checkUser()} alt=""/>
                        </div>
                    </Link>
                </div>
            </nav>
        </header>
    );
}
 
export default Nav;