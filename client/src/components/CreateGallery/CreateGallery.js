import React, { useState } from "react";
import { auth, firestore, timestamp } from '../../services/firebase';

const CreateGallery = () => {
    const [user] = useState(auth().currentUser);
    const [gallerytitle, setGallerytitle] = useState("");

    const handleChange = (e) => {
        setGallerytitle(e.target.value);
    };

    const handleCreate = () => {
        if (!gallerytitle) {
            return;
        }
        const createdAt = timestamp();
        firestore.collection("galleries").doc().set({
            title: gallerytitle,
            user: user.uid,
            createdAt,
        });
        setGallerytitle("");
    };

  return (
    <>
      <input value={gallerytitle} onChange={handleChange} type="text" />
      <button onClick={handleCreate}>Create Gallery</button>
    </>
  );
};

export default CreateGallery;