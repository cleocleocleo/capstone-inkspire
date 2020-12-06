import './ImageGrid.scss';
import useFirestore from '../../hooks/useFirestore';
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImg }) => {
    const { docs } = useFirestore('images');

    return (
        <div className="img-grid">
            { docs && docs.map( doc => (
                <motion.div className="img-grid__container" key={doc.id}
                    layout
                    onClick={() => setSelectedImg(doc.url)}
                >
                    <motion.img className="img-grid__img" src={doc.url} alt="user uploaded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    />
                </motion.div>
            ))}
        </div>
    );
}
 
export default ImageGrid;