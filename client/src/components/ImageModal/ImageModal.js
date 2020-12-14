import './ImageModal.scss';
import { motion } from 'framer-motion';
import { Link, useRouteMatch } from 'react-router-dom';
import IconOverlay from '../IconOverlay/IconOverlay';

const ImageModal = ({ selectedImg, setSelectedImg }) => {
    const handleClick = (e) => {
        if (e.target.classList.contains('img-modal')) {
            setSelectedImg(null);
        }
    };

    const match = useRouteMatch();

    return (
        <>
            <motion.div className="img-modal" onClick={handleClick}
                intial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.img className="img-modal__img" src={selectedImg.url} alt={selectedImg.title}
                    initial={{ y: "-100vh" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </motion.div>
            <div className="img-modal__info">
                <h3 className="img-modal__text">{selectedImg.title}</h3>
                {match.path !== '/profile/:gallery' &&
                    <h3 className="img-modal__text">by: <Link to={`/user/${selectedImg.username}`} className="img-modal__link">{selectedImg.username}</Link></h3>
                }
                <p className="img-modal__description">{selectedImg.description}</p>
                <p>Likes: {!selectedImg.likes
                    ? 0
                    : selectedImg.likes.length }
                </p>
                { (match.path !== '/profile/:gallery' && match.path !== '/profile') &&
                    <IconOverlay selectedImg={selectedImg}/>
                }
            </div>
        </>
    );
}
 
export default ImageModal;