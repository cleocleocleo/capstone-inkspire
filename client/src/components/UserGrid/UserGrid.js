import './UserGrid.scss';
import useQuery from '../../hooks/useQuery';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UserGrid = ({ searchParams }) => {
    const { field, operator, query } = searchParams;
    const { docs } = useQuery('users', field, operator, query);
    
    return (
        <div className="user-grid">
            {docs && docs.map(doc => (
                <motion.div className="user-grid__card" key={doc.id} layout >
                    <div className="user-grid__img-container">
                        <motion.img className="user-grid__img"
                            src={doc.profileImg}
                            alt={doc.description}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </div>
                    <div className="user-grid__details">
                        <h1 className="user-grid__username">
                            <Link to={`/user/${doc.username}`} className="user-grid__link">
                                {doc.username}
                            </Link>
                        </h1>                        
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default UserGrid;