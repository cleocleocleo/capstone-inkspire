import { useState, useEffect } from 'react';
import { storage, firestore, timestamp } from  '../services/firebase';
import { auth } from '../services/firebase';

const useStorage = file => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const [user] = useState(auth().currentUser);

    useEffect(() => {
        const storageRef = storage.ref(file.name);
        const collectionRef = firestore.collection('images');

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (error) => {
            setError(error);
        }, async () => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timestamp();
            const userID = user.uid
            collectionRef.add({ url, createdAt, userID });
            setUrl(url);
        });
    }, [file, user]);
    
    return { progress, url, error };
}

export default useStorage;