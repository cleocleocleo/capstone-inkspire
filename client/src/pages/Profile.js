import React, { useState, useEffect } from 'react';
import GalleryGrid from '../components/GalleryGrid/GalleryGrid';
import { auth, firestore } from '../services/firebase';
import CreateGallery from '../components/CreateGallery/CreateGallery';
import CreateProfile from '../components/CreateProfile/CreateProfile';
import useFirestoreCol from '../hooks/useFirestoreCol';

const Profile = () => {
    const [galleries, setGalleries] = useState([]);
    const [user] = useState(auth().currentUser);
    const { docs } = useFirestoreCol('users');

    const checkUser = () => {
        const userData = docs.filter(doc => doc.id === user.uid);
        if (userData[0]) {
            return true
        } else {
            return false
        }
    }

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
            {!checkUser() && <CreateProfile />}
            {checkUser() &&
                <div>
                    <CreateGallery />
                    <GalleryGrid galleries={galleries} />
                </div>
            }
        </div>
    );
};

export default Profile;