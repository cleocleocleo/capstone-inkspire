import './ImageGrid.scss';
import useQuery from '../../hooks/useQuery';
import { motion } from 'framer-motion';

const ImageGrid = ({ setSelectedImg, searchParams }) => {
    const { field, operator, query } = searchParams;
    const { docs } = useQuery('images', field, operator, query);

    return (
        <div className="img-grid">
            {docs && docs.map(doc => (
                <motion.div className="img-grid__container" key={doc.id}
                    layout
                    onClick={() => setSelectedImg(doc)}
                >
                    <motion.img className="img-grid__img"
                        src={doc.url}
                        alt={doc.description}
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