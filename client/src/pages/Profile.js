import React, { useState, useEffect } from 'react';
// import ImageUploader from '../components/ImageUploader/ImageUploader';
// import ImageGrid from '../components/ImageGrid/ImageGrid';
import GalleryGrid from '../components/GalleryGrid/GalleryGrid';
import ImageModal from '../components/ImageModal/ImageModal';
import { auth, firestore } from  '../services/firebase';
import CreateGallery from '../components/CreateGallery/CreateGallery';

const Profile = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [galleries, setGalleries] = useState([]);
    const [user] = useState(auth().currentUser);

    useEffect(() => {
        const unsub = firestore.collection('galleries')
        .where('user', '==', user.uid)
        .onSnapshot((snap) => {
          const tempGalleries = [];
          snap.forEach((doc) => {
            tempGalleries.push({ ...doc.data(), id: doc.id });
          });
          setGalleries(tempGalleries);
        });
        return () => unsub();
      }, [user.uid]);

    return (
        <div>
            <h1>Profile Page - </h1>
            {/* <ImageUploader /> */}
            <CreateGallery />
            <GalleryGrid galleries={galleries} />
            {/* <ImageGrid
                setSelectedImg={setSelectedImg}
            /> */}
            { selectedImg &&
                <ImageModal
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                /> }
        </div>
    );
};

export default Profile;