import ProfileDetails from '../components/ProfileDetails/ProfileDetails';
import useQuery from '../hooks/useQuery';
import { useState } from 'react';
import ImageModal from '../components/ImageModal/ImageModal';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import { useRouteMatch } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { v4 as uuidv4 } from 'uuid';

const User = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const match = useRouteMatch();

    const { docs } = useQuery('users', 'username', '==', match.params.username);
    const userInfo = docs ? docs[0] : {};
    
    const query = {
        field: 'username',
        operator: '==',
        query: match.params.username
    };

    return !docs[0] ? 'loading...' : (
        <div>
            <div>
                <ProfileDetails
                    userInfo={userInfo}
                    url={match.url}
                    setSelectedImg={setSelectedImg}
                />
            </div>
            { docs[0].isArtist &&
                <>
                    <ImageGrid
                        searchParams={query}
                        setSelectedImg={setSelectedImg}
                    />
                    { selectedImg &&
                        <ImageModal
                            selectedImg={selectedImg}
                            setSelectedImg={setSelectedImg}
                        />
                    }
                </>
            }
        </div>
    );
}
 
export default User;