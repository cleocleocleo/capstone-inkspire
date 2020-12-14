import './Footer.scss';
import GHlogo from '../../assets/icons/github.svg';
import LIlogo from '../../assets/icons/linkedin.svg';

const Footer = () => {
    return ( 
        <footer className="footer">
            <div className="footer__container">
                <a className="footer__link" href="https://github.com/cleocleocleo"><img className="footer__logo" src={GHlogo} alt="github logo"/></a>
                <a className="footer__link" href="https://www.linkedin.com/in/cleo-g123/"><img className="footer__logo" src={LIlogo} alt="linkedin logo" /></a>
            </div>
        </footer>
    );
}
 
export default Footer;