import { useState, useEffect } from 'react';
import { auth, firestore } from '../services/firebase';

const useGalleries = () => {
    const [galleries, setGalleries] = useState([]);
    const [user] = useState(auth().currentUser);

    useEffect(() => {
        const unsub = firestore.collection('galleries')
            .where('user', '==', user.uid)
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                });
                setGalleries(documents);
            })
        return () => unsub();
    }, [user.uid]);
    return { galleries };
};

export default useGalleries;