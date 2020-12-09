import React, { useState } from 'react'
import { auth, firestore, storage, timestamp, arrayUnion } from '../../services/firebase';
import { useForm } from "react-hook-form";

const AddImage = ({ gallery }) => {
    const [file, setFile] = useState(null);
    const [user] = useState(auth().currentUser);

    const {
        register,
        handleSubmit
    } = useForm();

    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const onUpload = async (data) => {
        const title = data.title;
        const description = data.description;
        const category = data.category;
        const userID = user.uid;
        
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        const imagesRef = firestore.collection('images');
        const galleriesRef = firestore.collection('galleries');
        
        await fileRef.put(file)

        galleriesRef.doc(gallery).update({
            user: userID,
            createdAt: timestamp(),
            images: arrayUnion({
                title,
                url: await fileRef.getDownloadURL()
            })
        })
        imagesRef.add({
            url: await fileRef.getDownloadURL(),
            createdAt: timestamp(),
            user: userID,
            title,
            description,
            category
        });
    };

    return (
        <form onSubmit={handleSubmit(onUpload)}>
            <label htmlFor="title">Title: </label>
            <input
                name="title"
                type="text"
                ref={register({ required: true })}
            />
            <label htmlFor="description">Description: </label>
            <input
                name="description"
                type="text"
                ref={register({ required: true })}
            />
            <label htmlFor="category">Category: </label>
            <select name="category" ref={register({ required: true })}>
                <option value="">Select</option>
                <option value="traditional">Traditional</option>
                <option value="new school">New School</option>
                <option value="japanese">Japanese</option>
                <option value="black grey">Black/Grey</option>
                <option value="portraiture">Portraiture</option>
                <option value="stick and poke">Stick & Poke</option>
                <option value="realism">Realism</option>
                <option value="blackwork">Blackwork</option>
                <option value="Geometric">Geometric</option>
                <option value="watercolour">Watercolour</option>
                <option value="sketch">Sketch</option>
                <option value="other">Other</option>
            </select>
            <input name="file" type="file" onChange={onFileChange} ref={register({ required: true })} />
            <button type="submit">Upload image</button>
        </form>
    )
};

export default AddImage;