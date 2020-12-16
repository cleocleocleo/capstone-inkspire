import React, { useState } from 'react';
import './CreateProfile.scss';
import { useForm } from "react-hook-form";
import { auth, firestore, storage, timestamp } from '../../services/firebase';
import MultiSelect from "react-multi-select-component";

const CreateProfile = () => {
    const [file, setFile] = useState(null);
    const [user] = useState(auth().currentUser);
    const [error, setError] = useState(null);
    const [selected, setSelected] = useState([]);

    const options = [
        { value: "traditional", label: "Traditional" },
        { value: "new school", label: "New School" },
        { value: "japanese", label: "Japanese" },
        { value: "black grey", label: "Black / Grey" },
        { value: "portraiture", label: "Portraiture" },
        { value: "stick and poke", label: "Stick & Poke" },
        { value: "realism", label: "Realism" },
        { value: "blackwork", label: "Blackwork" },
        { value: "geometric", label: "Geometric" },
        { value: "watercolour", label: "Watercolour" },
    ];

    const { register, handleSubmit, watch} = useForm();

    const ifArtist = watch("isArtist");

    const types = ['image/png', 'image/jpeg'];

    const onFileChange = (e) => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpg)');
        }
    };

    const onSubmit = async (data) => {
        const userID = user.uid;
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        const collectionRef = firestore.collection('users');

        await fileRef.put(file)
        const username = data.username;
        const firstName = data.firstName;
        const lastName = data.lastName;
        const bio = data.bio;
        const isArtist = !data.isArtist ? false : true;
        const artStyle = selected.map((item) => {
            return item.value
        })

        const bookings = data.bookings;

        const formDataArtist = {
            username,
            firstName,
            lastName,
            bio,
            isArtist,
            artStyle,
            bookings,
            profileImg: await fileRef.getDownloadURL(),
            createdAt: timestamp(),
        };

        const formData = {
            username,
            firstName,
            lastName,
            bio,
            isArtist,
            profileImg: await fileRef.getDownloadURL(),
            createdAt: timestamp(),
        };

        const submitData = !isArtist
        ? formData
        : formDataArtist;

        collectionRef.doc(userID).set(submitData);
    };

    return (
        <form className="create-profile" onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="create-profile__fieldset">
                <label>
                    <h3 className="create-profile__label" >Username:</h3>
                    <input
                        className="create-profile__text-input"
                        type="text"
                        name="username"
                        ref={register({ required: true, maxLength: 80 })}
                    />
                </label>
                <label >
                    <h3 className="create-profile__label">First Name:</h3>
                    <input
                        className="create-profile__text-input"
                        type="text"
                        name="firstName"
                        ref={register({ required: true, maxLength: 80 })}
                    />
                </label>
                <label>
                    <h3 className="create-profile__label">Last Name:</h3>
                    <input
                        className="create-profile__text-input"
                        type="text"
                        name="lastName"
                        ref={register({ required: true, maxLength: 100 })}
                    />
                </label>
                <label>
                    <h3 className="create-profile__label">Bio:</h3>
                    <textarea
                        className="create-profile__text-area"
                        name="bio"
                        ref={register({ required: false, maxLength: 300 })}
                    />
                </label>
            </fieldset>
            <fieldset className="create-profile__fieldset">
                <h3 className="create-profile__label">Are you a Tattoo Artist?</h3>
                <label>
                    <input
                        className="create-profile__select"
                        name="isArtist"
                        type="checkbox"
                        value="true"
                        ref={register}
                    /><p className="create-profile__select-text">Yes</p>
                </label>
                {ifArtist && (
                    <div>
                        <label>
                            <h3 className="create-profile__label">Art Style:</h3>
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                labelledBy={"Art Style"}
                                hasSelectAll={false}
                            />
                        </label>
                        <h3 className="create-profile__label create-profile__label--booking">Booking Availability</h3>
                        <label>
                            <input
                                className="create-profile__select"
                                name="bookings"
                                type="radio"
                                value="open"
                                ref={register}
                            /><p className="create-profile__select-text">Open</p>
                            <input
                                className="create-profile__select"
                                name="bookings"
                                type="radio"
                                value="waitlist"
                                ref={register}
                            /><p className="create-profile__select-text">Wait List</p>
                            <input
                                className="create-profile__select"
                                name="bookings"
                                type="radio"
                                value="closed"
                                ref={register}
                            /><p className="create-profile__select-text">Books Closed</p>
                        </label>
                    </div>
                )}
                <div className="create-profile__upload-wrap">
                    <label className="create-profile__upload-btn">
                        <h3 className="create-profile__label">Upload Avatar:</h3>
                        <input type="file"
                            name="file"
                            onChange={onFileChange}
                            ref={register({ required: true })}
                        />
                    </label>
                    <div className="output">
                        {error && <div className="error">{error}</div>}
                        {file && <div>{file.name}</div>}
                    </div>
                </div>
            </fieldset>
            <button className="create-profile__submit" type="submit">Create Profile</button>
        </form>
    );
}

export default CreateProfile;