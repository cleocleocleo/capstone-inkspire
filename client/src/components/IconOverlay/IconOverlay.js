import './IconOverlay.scss';
import React, { useState } from 'react';
import { ReactComponent as Like } from '../../assets/icons/like2.svg';
import { auth, firestore, arrayUnion } from '../../services/firebase';
import { motion } from 'framer-motion';

const IconOverlay = ({ selectedImg }) => {
    const [user] = useState(auth().currentUser);

    const addLike = () => {
        const imgRef = firestore.collection('images').doc(selectedImg.id)
        const userRef = firestore.collection('users').doc(user.uid)
        
        imgRef.update({
            likes: arrayUnion({
                user: firestore.doc('users/' + user.uid)
            })
        })
        userRef.update({
            likes: arrayUnion({
                image: firestore.doc('images/' + selectedImg.id),
                url: selectedImg.id
            })
        })
    };

    return ( 
        <motion.div className="icons"
            whileHover={{
                scale: 1.2,
                transition: { duration: 0.5 },
            }}
            whileTap={{ scale: 0.9 }}>
            <Like className="icons__like" onClick={addLike}/>
        </motion.div>
    );
}
 
export default IconOverlay;