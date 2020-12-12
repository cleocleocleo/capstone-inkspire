import './Gallery.scss';
import React, { useState, useEffect } from 'react';
import { firestore } from '../../services/firebase';
import { Link } from "react-router-dom";
import AddImage from '../AddImage/AddImage';
import ImageModal from '../ImageModal/ImageModal';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const Gallery = props => {
    const [images, setImages] = useState([]);
    const [galleryName, setGalleryName] = useState("");
    const [selectedImg, setSelectedImg] = useState(null);
    const { gallery } = props.match.params;

    useEffect(() => {
        const unsub = firestore.collection("galleries")
            .doc(gallery)
            .onSnapshot((snap) => {
                let documents = [];
                snap.data().images.forEach((image) => {
                    documents.push(image);
                });
                setImages(documents);
                setGalleryName(snap.data().title);
            });
        return () => unsub();
    }, [gallery]);

    return (
        <div>
            <header>
                <h1>{galleryName}</h1>
                <p>Go to the <Link to="/">Home page</Link></p>
            </header>
            <section className="gallery">
                {images.map((image) => (
                    <motion.div className="gallery__container"
                        key={uuidv4()}
                        layout
                        onClick={() => setSelectedImg(image.url)}>
                        <motion.img className="gallery__img"
                            src={image.url}
                            alt={image.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}/>
                    </motion.div>
                ))}
            </section>
            <div>
                <AddImage gallery={gallery} />
                {selectedImg &&
                    <ImageModal
                        selectedImg={selectedImg}
                        setSelectedImg={setSelectedImg}
                    />
                }
            </div>
        </div>
    );
}

export default Gallery;