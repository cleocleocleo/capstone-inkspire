import React, { useState } from 'react';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import ImageModal from '../components/ImageModal/ImageModal';

const Search = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    return (
        <div>
            <h1>Search</h1>
            <ImageGrid
                setSelectedImg={setSelectedImg}
            />
            { selectedImg &&
                <ImageModal
                    selectedImg={selectedImg}
                    setSelectedImg={setSelectedImg}
                />
            }
        </div>
    );
}

export default Search;