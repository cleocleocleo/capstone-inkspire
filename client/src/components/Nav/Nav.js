import './Nav.scss';
import { Link } from 'react-router-dom';
import useFirestore from '../../hooks/useFirestore';

const Nav = ({ user }) => {
    const { docs } = useFirestore('users');
    const getUser = docs.filter(doc => doc.id === user.uid);

    return ( 
        <nav className="nav">
            <Link to="/profile">
                <div className="nav__profile-container">
                    { getUser[0] &&
                        <img className="nav__profile-img"
                        src={getUser[0].profileImg} alt=""/>
                    }
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
    );
}
 
export default Nav;