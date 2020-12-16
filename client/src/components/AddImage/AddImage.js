import './AddImage.scss';
import React, { useState } from 'react';
import useUserInfo from '../../hooks/useUserInfo';
import { firestore, storage, timestamp, arrayUnion } from '../../services/firebase';
import { useForm } from "react-hook-form";
import MultiSelect from "react-multi-select-component";

const AddImage = ({ gallery }) => {
    const [file, setFile] = useState(null);
    const [selected, setSelected] = useState([]);
    const [error, setError] = useState(null);
    const { userInfo } = useUserInfo();

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

    const { register, handleSubmit, reset } = useForm();

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

    const onUpload = async (data) => {
        const title = data.title;
        const description = data.description;
        const user = userInfo.id;
        const username = userInfo.username;
        const artStyle = selected.map((item) => {
            return item.value
        })
        
        const storageRef = storage.ref()
        const fileRef = storageRef.child(file.name)
        const imagesRef = firestore.collection('images');
        const galleriesRef = firestore.collection('galleries');
        const userRef = firestore.collection('users');
        
        await fileRef.put(file)

        galleriesRef.doc(gallery).update({
            user,
            username,
            createdAt: timestamp(),
            images: arrayUnion({
                title,
                url: await fileRef.getDownloadURL()
            })
        })
        userRef.doc(userInfo.id).update({
            images: arrayUnion({
                title,
                url: await fileRef.getDownloadURL()
            })
        })
        imagesRef.add({
            url: await fileRef.getDownloadURL(),
            createdAt: timestamp(),
            user,
            username,
            title,
            description,
            artStyle,
        });

        reset();
    };

    return (
        <section className="add-img">
            <h2 className="add-img__header">Add Image:</h2>
            <form className="add-img__form" onSubmit={handleSubmit(onUpload)}>
                <fieldset className="add-img__fieldset">
                    <label>
                        <h3 className="add-img__label">Title: </h3>
                        <input className="add-img__text-input"
                            name="title"
                            type="text"
                            ref={register({ required: true })}
                        />
                    </label>
                    <label>
                        <h3 className="add-img__label">Description: </h3>
                        <input className="add-img__text-input add-img__text-input--description"
                            name="description"
                            type="text"
                            ref={register({ required: true })}
                        />
                    </label>
                </fieldset>
                <fieldset className="add-img__fieldset">
                    <label>
                        <h3 className="add-img__label">Art Style:</h3>
                        <MultiSelect
                            options={options}
                            value={selected}
                            onChange={setSelected}
                            labelledBy={"Art Style"}
                            hasSelectAll={false}
                        />
                    </label>
                    <div className="add-img__upload-wrap">
                        <label className="add-img__upload-btn">
                            <h4>Choose a file</h4>
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
                <button className="add-img__submit" type="submit">Upload</button>
            </form>
        </section>
    )
};

export default AddImage;