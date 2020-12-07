import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader/ImageUploader';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import ImageModal from '../components/ImageModal/ImageModal';

const Profile = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    return (
        <div>
            <h1>Profile Page - </h1>
            <ImageUploader />
            <ImageGrid
                setSelectedImg={setSelectedImg}
            />
            { selectedImg &&
                <ImageModal
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                /> }
        </div>
    );
};

export default Profile;