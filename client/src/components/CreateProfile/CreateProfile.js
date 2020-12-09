import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { auth, firestore, storage, timestamp } from '../../services/firebase';

const CreateProfile = () => {
    const [file, setFile] = useState(null);
    const [user] = useState(auth().currentUser);

    const {
        register,
        handleSubmit
    } = useForm();

    const onFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const onSubmit = async (data) => {
        const username = data.username;
        const firstName = data.firstName;
        const lastName = data.lastName;
        const isArtist = data.isArtist;
        const userID = user.uid;

        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        const collectionRef = firestore.collection('users');

        await fileRef.put(file)

        collectionRef.doc(userID).set({
            username,
            firstName,
            lastName,
            profileImg: await fileRef.getDownloadURL(),
            createdAt: timestamp(),
            isArtist,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                <h3>Username</h3>
                <input
                    type="text"
                    name="username"
                    ref={register({ required: true, maxLength: 80 })}
                />
            </label>
            <label >
                <h3>First Name</h3>
                <input
                    type="text"
                    name="firstName"
                    ref={register({ required: true, maxLength: 80 })}
                />
            </label>
            <label>
                <h3>Last Name</h3>
                <input
                    type="text"
                    name="lastName"
                    ref={register({ required: true, maxLength: 100 })}
                />
            </label>
            <h3>Are you a Tattoo Artist?</h3>
            <label>
                <input
                    name="isArtist"
                    type="radio"
                    value={true}
                    ref={register({ required: true })}
                />Yes
            </label>
            <label>
                <input
                    name="isArtist"
                    type="radio"
                    value={false}
                    ref={register({ required: true })}
                />No
            </label>
            <label>
                <h3>Upload Avatar</h3>
                <input name="file" type="file" onChange={onFileChange} ref={register({ required: true })} />
            </label>
            <br/><button type="submit">CreateProfile</button>
        </form>
    );
}

export default CreateProfile;