import { useState, useEffect } from 'react';
import { firestore } from '../services/firebase';

const useImageFilter = (query) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = firestore.collection('images')
            .where("artStyle", 'array-contains-any', query)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                });
                setDocs(documents);
            });
        return () => unsub();
    }, [query])

    return { docs };
};

export default useImageFilter;