import './ImageGrid.scss';
import useImageFilter from '../../hooks/useImageFilter';
import { motion } from 'framer-motion';
import SearchFilters from '../SearchFilters/SearchFilters';

const ImageGrid = ({ setSelectedImg, query, setQuery }) => {
    const { docs } = useImageFilter(query);
    
    return (
        <>
            <SearchFilters
                query={query}
                setQuery={setQuery} 
            />
            <div className="img-grid">
                {docs && docs.map(doc => (
                    <motion.div className="img-grid__container" key={doc.id}
                        layout
                        onClick={() => setSelectedImg(doc.url)}
                    >
                        <motion.img className="img-grid__img"
                            src={doc.url}
                            alt="user uploaded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </motion.div>
                ))}
            </div>
        </>
    );
}

export default ImageGrid;