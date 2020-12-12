import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { auth, firestore, storage, timestamp } from '../../services/firebase';
import MultiSelect from "react-multi-select-component";

const CreateProfile = () => {
    const [file, setFile] = useState(null);
    const [user] = useState(auth().currentUser);
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
        { value: "sketch", label: "Sketch" },
        { value: "other", label: "Other" }
    ];

    const { register, handleSubmit, watch} = useForm();

    const ifArtist = watch("isArtist");

    const onFileChange = (e) => {
        setFile(e.target.files[0])
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
            <label>
                <h3>Bio</h3>
                <textarea
                    name="bio"
                    ref={register({ required: false, maxLength: 300 })}
                />
            </label>
            <h3>Are you a Tattoo Artist?</h3>
            <label>
                <input
                    name="isArtist"
                    type="checkbox"
                    value="true"
                    ref={register}
                />Yes
            </label>
            {ifArtist && (
                <div>
                    <label>
                        <h3>Art Style</h3>
                        <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            labelledBy={"Art Style"}
                            hasSelectAll={false}
                        />
                    </label>
                    <h3>Booking Availability</h3>
                    <label>
                        <input
                            name="bookings"
                            type="radio"
                            value="open"
                            ref={register}
                        />Open Availability
                        <input
                            name="bookings"
                            type="radio"
                            value="waitlist"
                            ref={register}
                        />Wait List
                        <input
                            name="bookings"
                            type="radio"
                            value="closed"
                            ref={register}
                        />Books Closed
                    </label>
                </div>
            )}
            <label>
                <h3>Upload Avatar</h3>
                <input name="file"
                    type="file"
                    onChange={onFileChange}
                    ref={register}
                />
            </label>
            <br />
            <button type="submit">CreateProfile</button>
        </form>
    );
}

export default CreateProfile;