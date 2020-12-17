import React, { useState } from "react";
import './CreateGallery.scss';
import { auth, firestore, timestamp } from '../../services/firebase';
import { useForm } from "react-hook-form";

const CreateGallery = () => {
    const [user] = useState(auth().currentUser);

    const { register, handleSubmit, reset } = useForm();

    const handleCreate = (data) => {
        const title = data.title;

        const createdAt = timestamp();
        firestore.collection("galleries").doc().set({
            title,
            user: user.uid,
            createdAt,
        });
        
        reset();
    };

    return (
        <>
            <h1>Your Image Galleries</h1>
            <div className="create-gallery">
                <h2 className="create-gallery__header">Add New Gallery</h2>
                <form className="create-gallery__form" onSubmit={handleSubmit(handleCreate)}>
                    <h3 className="create-gallery__label">Title:</h3>
                    <label>
                        <input className="create-gallery__text-input"
                            name="title"
                            type="text"
                            ref={register({ required: true })}
                        />
                    </label>
                    <button className="create-gallery__btn" type="submit">Create Gallery</button>
                </form>
            </div>
        </>
    );
};

export default CreateGallery;