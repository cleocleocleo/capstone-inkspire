import ProfileDetails from '../components/ProfileDetails/ProfileDetails';
import useQuery from '../hooks/useQuery';
import { useState } from 'react';
import ImageModal from '../components/ImageModal/ImageModal';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const User = (props) => {
    const [selectedImg, setSelectedImg] = useState(null);
    const { docs } = useQuery('users', 'username', '==', props.match.params.username);
    const userInfo = docs ? docs[0] : {};

    return (
        <div>
            { docs[0] &&
                <div>
                    <ProfileDetails
                        userInfo={userInfo}
                        url={props.match.url}
                        setSelectedImg={setSelectedImg}
                    />
                    { selectedImg &&
                        <ImageModal
                            selectedImg={selectedImg}
                            setSelectedImg={setSelectedImg}
                        />
                    }
                    <div className="img-grid">
                        {docs && docs[0].images.map(doc => (
                            <motion.div className="img-grid__container" key={uuidv4()}
                                layout
                                onClick={() => setSelectedImg(doc.url)}
                            >
                                <motion.img className="img-grid__img"
                                    src={doc.url}
                                    alt={doc.title}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}
 
export default User;