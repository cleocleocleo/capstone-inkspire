import './ImageUploader.scss';
import React, { useState } from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';

const ImageUploader = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const types = ['image/png', 'image/jpeg'];

    const handleChange = (e) => {
        const upload = e.target.files[0];

        if (upload && types.includes(upload.type)) {
            setFile(upload)
            setError('');
        } else {
            setFile(null);
            setError('Please select an image file (png or jpeg)');
        }
    }

    return (
       <form className="upload">
            <label>
                <h3 className="upload__label">Upload Image</h3>
                <input type="file" onChange={handleChange}/>
                <div className="upload__output">
                    { error && <div>{ error }</div> }
                    { file && <div>{ file.name }</div> }
                    { file && <ProgressBar file={file} setFile={setFile} />}
                </div>
            </label>
       </form>
    );
};

export default ImageUploader;