import React from 'react';

const Search = (props) => {
    return (
        <form>
            <input type="text"
                   value={props.newCityText}
                   onChange={props.onChangeCity}
                   onDragEnter={props.addCity}
            />
            <button
                onClick={props.addCity}
            >Add City
            </button>
        </form>
    );
};

export default Search;