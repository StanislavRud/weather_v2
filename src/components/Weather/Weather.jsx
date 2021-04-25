import React from 'react';
import style from './Weather.module.css'

const Weather = (props) => {

    return (
        <div>
            <ul className={style.main_weather}>
                {props.citys.map(item => (
                    <li className={style.city} key={item.id}><h3>{item.name}</h3> Temp: {Math.floor(item.temp)}°C
                        <img src={`http://openweathermap.org/img/w/${item.img}.png`} alt=""/>
                        <h4>{item.description}</h4>
                        <button
                            onClick={() => props.removeCity(item.id)}
                        >Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Weather;