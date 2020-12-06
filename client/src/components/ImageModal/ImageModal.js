import './ImageModal.scss';
import { motion } from 'framer-motion';

const ImageModal = ({ selectedImg, setSelectedImg }) => {

    const handleClick = (e) => {
        if (e.target.classList.contains('img-modal')) {
            setSelectedImg(null);
        }
    }

    return (
        <motion.div className="img-modal" onClick={handleClick}
            intial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.img className="img-modal__img" src={selectedImg} alt="fullview"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            />
        </motion.div>
    );
}
 
export default ImageModal;