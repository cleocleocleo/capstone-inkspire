import './Nav.scss';
import { Link } from 'react-router-dom';
import useUserInfo from '../../hooks/useUserInfo';
import userIcon from '../../assets/icons/user.svg';

const Nav = () => {
    const { userInfo } = useUserInfo();

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
                <Link to="/profile">
                    <div className="nav__profile-container">
                            <img className="nav__profile-img"
                            src={checkUser()} alt=""/>
                    </div>
                </Link>
                <Link to="/">
                    <h1 className="nav__title">Inkspire</h1>
                </Link>
                <div className="nav__list">
                    <Link to="/profile"><h3>Profile</h3></Link>
                    <Link to="/search"><h3>Search</h3></Link>
                </div>
            </nav>
        </header>
    );
}
 
export default Nav;