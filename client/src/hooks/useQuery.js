import { useState, useEffect } from 'react';
import { firestore } from '../services/firebase';

const useQuery = (collection, field, operator, query) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = firestore.collection(collection)
            .where(field, operator, query)
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach((doc) => {
                    documents.push({ ...doc.data(), id: doc.id })
                });
                setDocs(documents);
            }, );
        return () => unsub();
    }, [collection, field, operator, query])

    return { docs };
}
 
export default useQuery;