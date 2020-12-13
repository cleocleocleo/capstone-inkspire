import './SearchFilters.scss';
import React, { useState } from 'react';
import MultiSelect from "react-multi-select-component";

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
    { value: "watercolour", label: "Watercolour" }
];

const SearchFilters = ({ setSearchParams, searchType, setSearchType }) => {
    const [selected, setSelected] = useState([]);

    const handleQueryChange = e => {
        e.preventDefault();

        const queries = selected.map(item => {
            return item.value
        });
        if (!queries.length) {
            setSearchParams({
                collection: searchType,
                field: 'artStyle',
                operator: 'array-contains-any',
                query: [
                "traditional", "new school", "japanese", "black grey", "portraiture", "stick and poke", "realism", "blackwork", "geometric", "watercolour"
            ]});
        } else {
            setSearchParams({ 
                collection: searchType,
                field: 'artStyle',
                operator: 'array-contains-any',
                query: queries
            });
        }
    };

    const handleClear = () => {
        setSearchParams({
            collection: searchType,
            field: 'artStyle',
            operator: 'array-contains-any',
            query: [
                "traditional", "new school", "japanese", "black grey", "portraiture", "stick and poke", "realism", "blackwork", "geometric", "watercolour"
            ]
        })
    };

    const toggleSearch = () => {
        searchType === 'images'
            ? setSearchType('users')
            : setSearchType('images');
    };

    return (
        <aside className="search-filters">
            { searchType === 'images' &&
                <div>
                    <h3>Tattoo Search</h3>
                    <button onClick={toggleSearch}>Search for Artists</button>
                </div>
            }
            { searchType === 'users' &&
                <div>
                    <h3>Artist Search</h3>
                    <button onClick={toggleSearch}>Search for Tattoos</button>
                </div>
            }
            <form onSubmit={handleQueryChange}>
                <MultiSelect
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={"Art Style"}
                    hasSelectAll={false}
                />
                <button type="submit">search</button>
            </form>
            <button onClick={handleClear}>clear search</button>
        </aside>
    );
}

export default SearchFilters;