import React, { useState, useEffect } from 'react'
import { auth, firestore, storage, timestamp, arrayUnion } from '../../services/firebase';
import { useForm } from "react-hook-form";
import Select from "react-select";

const AddImage = ({ gallery }) => {
    const [file, setFile] = useState(null);
    const [user] = useState(auth().currentUser);
    const [values, setReactSelect] = useState({
        selectedOption: []
    });

    const {
        register,
        handleSubmit,
        setValue
    } = useForm();

    const handleMultiChange = selectedOption => {
        setValue("reactSelect", selectedOption);
        setReactSelect({ selectedOption });
    };

    const options = [
        { value: "traditional", label: "Traditional" },
        { value: "new school", label: "New School" },
        { value: "japanese", label: "Japanese" },
        { value: "black grey", label: "Black / Grey" },
        { value: "portraiture", label: "Portraiture" },
        { value: "stick and poke", label: "Stick & Poke" },
        { value: "realism", label: "Realism" },
        { value: "blackwork", label: "Blackwork" },
        { value: "Geometric", label: "Geometric" },
        { value: "watercolour", label: "Watercolour" },
        { value: "sketch", label: "Sketch" },
        { value: "other", label: "Other" }
    ];

    useEffect(() => {
        register({ name: "reactSelect" });
    }, [register]);

    const onFileChange = (e) => {
        setFile(e.target.files[0])
    };

    const onUpload = async (data) => {
        const title = data.title;
        const description = data.description;
        const userID = user.uid;
        const artStyles = !data.artStyles
            ? []
            : data.reactSelect.map((item) => {
                return item.value
            });
        
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
            artStyles,
        });
    };

    return (
        <form onSubmit={handleSubmit(onUpload)}>
            <label>
                <h3>Title: </h3>
                <input
                    name="title"
                    type="text"
                    ref={register({ required: true })}
                />
            </label>
            <label>
                <h3>Description: </h3>
                <input
                    name="description"
                    type="text"
                    ref={register({ required: true })}
                />
            </label>
            <label>
                <h3>Art Styles</h3>
                <Select
                    name="artStyles"
                    placeholder="Add Art Styles"
                    value={values.selectedOption}
                    options={options}
                    onChange={handleMultiChange}
                    isMulti
                    ref={register({ required: true })}
                />
            </label>
            <input name="file" type="file" onChange={onFileChange} ref={register({ required: true })} />
            <button type="submit">Upload image</button>
        </form>
    )
};

export default AddImage;