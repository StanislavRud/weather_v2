import React from 'react';
import style from "./Card.module.css";
import {NavLink} from "react-router-dom";

const Card = (props) => {

     // const ms = props.date.map(day => (day.dt * 1000));
    // const weekdayName = new Date(ms).toLocaleString('ru', {weekday: 'long'});
    return (
        <div>
            <NavLink to='/' >Home</NavLink>

            <div className="current">
                <ul className={style.current}>
                    {props.current.map(item => (
                        <li key={item.id}>
                            <h5 className="display-5 text-muted">Sumy, UA</h5>
                            <h2>Temp:{Math.floor(item.temp)}°C</h2>
                            <p>Feels like: {Math.floor(item.feelsLike)}°C</p>
                            <img src={`http://openweathermap.org/img/w/${item.img}.png`} alt=""/>
                            <h4>{item.description}</h4>
                            <p>Wind: {Math.floor(item.wind)} m/s</p>
                        </li>
                    ))}
                </ul>

            </div>
            <ul className={style.week}>
                {props.date.map(day =>
                    <li className={style.day}>{new Date(day.dt * 1000).toDateString()}
                        <div><img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt=""/></div>
                        <div>{day.weather[0].description}</div>
                        <p>Day: {Math.floor(day.temp.day)} °C</p>
                        <p>Night: {Math.floor(day.temp.night)} °C</p>
                    </li>)
                }

            </ul>
        </div>

    );
};

export default Card;
