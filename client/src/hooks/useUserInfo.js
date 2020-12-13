import { useState, useEffect } from 'react';
import { firestore } from '../services/firebase';

const useUserInfo = (user) => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const unsub = firestore.collection('users').doc(user)
            .onSnapshot((snap) => {
                setUserInfo({ ...snap.data(), id: snap.id });
            });
        return () => unsub()
    }, [user])
    return { userInfo };
}
 
export default useUserInfo;

