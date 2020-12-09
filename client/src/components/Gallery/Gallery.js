import './Gallery.scss';
import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import { Link } from "react-router-dom";
import AddImage from '../AddImage/AddImage';
import { v4 as uuidv4 } from 'uuid';

const Gallery = (props) => {
    const [images, setImages] = useState([]);
    const [galleryName, setGalleryName] = useState("");
    const { gallery } = props.match.params;

    useEffect(() => {
        const unsub = firestore.collection("galleries")
        .doc(gallery)
        .onSnapshot((doc) => {
            setImages(!doc.data().images ? [] : doc.data().images);
            setGalleryName(doc.data().name);
        });
        return () => unsub();
    }, [gallery]);
    
    return ( 
        <section>
            <header>
                <h1>{galleryName}</h1>
                <p>Go to the <Link to="/">Home page</Link></p>
            </header>
            {images.map((image) => (
                <div key={uuidv4()}>
                    <img src={image.url} alt="album" />
                </div>
            ))}
            <div>
                <AddImage gallery={gallery} />
            </div>
        </section>
    );
}
 
export default Gallery;