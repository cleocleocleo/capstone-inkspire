import React, { useState } from 'react';
import MultiSelect from "react-multi-select-component";

const SearchFilters = ({ setQuery }) => {
    const [selected, setSelected] = useState([]);

    const handleQueryChange = e => {
        e.preventDefault();

        const queries = selected.map(item => {
            return item.value
        });
        if (!queries.length) {
            setQuery([
                "traditional", "new school", "japanese", "black grey", "portraiture", "stick and poke", "realism", "blackwork", "geometric", "watercolour"
            ]);
        } else {
            setQuery(queries);
        }
    };

    const handleClear = () => {
        setQuery([
            "traditional", "new school", "japanese", "black grey", "portraiture", "stick and poke", "realism", "blackwork", "geometric", "watercolour"
        ])
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
        { value: "geometric", label: "Geometric" },
        { value: "watercolour", label: "Watercolour" },
        { value: "sketch", label: "Sketch" },
        { value: "other", label: "Other" }
    ];

    return (
        <aside>
            <h3>Search Filters</h3>
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