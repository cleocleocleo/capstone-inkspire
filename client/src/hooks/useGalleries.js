import { useState, useEffect } from 'react';
import { firestore } from '../services/firebase';

const useGalleries = (user) => {
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        const unsub = firestore.collection('galleries')
            .where('user', '==', user)
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                });
                setGalleries(documents);
            })
        return () => unsub();
    }, [user]);
    return { galleries };
};

export default useGalleries;