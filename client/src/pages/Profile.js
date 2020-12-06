import React, { useState } from 'react';
import { auth } from '../services/firebase';
import ImageUploader from '../components/ImageUploader/ImageUploader';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import ImageModal from '../components/ImageModal/ImageModal';

const Profile = () => {
    const [user] = useState(auth().currentUser);
    const [selectedImg, setSelectedImg] = useState(null);
    
    return (
        <div>
            <h1>Profile Page - {user.email}</h1>
            <ImageUploader />
            <ImageGrid setSelectedImg={setSelectedImg} />
            { selectedImg && <ImageModal selectedImg={selectedImg} setSelectedImg={setSelectedImg} /> }
        </div>
    );
};

export default Profile;