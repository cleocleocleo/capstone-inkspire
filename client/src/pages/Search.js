import React, { useState } from 'react';
import './Search.scss';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import UserGrid from '../components/UserGrid/UserGrid';
import ImageModal from '../components/ImageModal/ImageModal';
import SearchFilters from '../components/SearchFilters/SearchFilters';

const initialParams = {
    collection: 'images',
    field: 'artStyle',
    operator: 'array-contains-any',
    query: [
        "traditional", "new school", "japanese", "black grey", "portraiture", "stick and poke", "realism", "blackwork", "geometric", "watercolour"
    ]
};

const Search = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [searchType, setSearchType] = useState('images');
    const [searchParams, setSearchParams] = useState(initialParams);

    return (
        <div className="search">
            <SearchFilters
                setSearchParams={setSearchParams}
                searchType={searchType}
                setSearchType={setSearchType}
            />
            { searchType === 'images' &&
                <ImageGrid
                    setSelectedImg={setSelectedImg}
                    searchParams={searchParams}
                />
            }
            { searchType === 'users' &&
                <UserGrid
                    searchParams={searchParams}
                />
            }
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