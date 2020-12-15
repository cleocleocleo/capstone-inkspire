import SignUp from '../components/SignUp/SignUp';
import Login from '../components/Login/Login';
import { useRouteMatch } from 'react-router-dom';

const Splash = () => {
    const match = useRouteMatch();

    return ( 
        <div className="splash">
            <div className="splash__container">
                { match.path === '/login' && <Login /> }
                { match.path === '/signup' && <SignUp /> }
                { match.path === '/' &&
                    <>
                        <h1>Hi there..!</h1>
                        <p>Many people are interested by tattoos, yet are often intimidated by the thought of choosing something to have permanently displayed on their body. I created this site as a tool to aid in that decision making process. While there is absolutely no reason to rush into making a decision, it can be helpful if you have a place to organize your ideas, or seek inspiration. Hopefully you find this website useful as a means of bridging the gap between your ideas, and having a life-long art piece you can be proud of.
                        </p><br/>
                        <p>And to all of you hard working artists out there, this is your place to show off your work! Keep on creating, there are an endless amount of blank canvases out there, just waiting for the right artist to come along. ✌️
                        </p>
                    </>
                }
            </div>
        </div>
    );
}
 
export default Splash;