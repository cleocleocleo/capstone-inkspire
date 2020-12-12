import React, { useState } from 'react';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import ImageModal from '../components/ImageModal/ImageModal';

const Search = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [query, setQuery] = useState([
        "traditional", "new school", "japanese", "black grey", "portraiture", "stick and poke", "realism", "blackwork", "geometric", "watercolour"
    ]);

    return (
        <div>
            <h1>Search</h1>
            <ImageGrid
                setSelectedImg={setSelectedImg}
                query={query}
                setQuery={setQuery}
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