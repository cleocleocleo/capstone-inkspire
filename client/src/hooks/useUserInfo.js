import { useState, useEffect } from 'react';
import { auth, firestore } from '../services/firebase';

const useUserInfo = () => {
    const [user] = useState(auth().currentUser);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if (user) {
            const unsub = firestore.collection('users').doc(user.uid)
                .onSnapshot((snap) => {
                    setUserInfo({ ...snap.data(), id: snap.id });
                });
            return () => unsub()
        } else {
            setUserInfo({});
        }
    }, [user])
    return { userInfo };
}
 
export default useUserInfo;

