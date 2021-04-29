import React from 'react';
import style from './Search.module.css'

const Search = (props) => {

    return (
        <form className={style.form}>
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
