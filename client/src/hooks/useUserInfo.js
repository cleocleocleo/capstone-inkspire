import { useState, useEffect } from 'react';
import { auth, firestore } from '../services/firebase';

const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState({});
    const [user] = useState(auth().currentUser);

    useEffect(() => {
        const unsub = firestore.collection('users').doc(user.uid)
            .onSnapshot((snap) => {
                setUserInfo({ ...snap.data(), id: snap.id });
            });
        return () => unsub()
    }, [user.uid])
    return { userInfo };
}
 
export default useUserInfo;

