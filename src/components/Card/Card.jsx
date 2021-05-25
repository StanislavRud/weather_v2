import React from 'react';
import style from "./Card.module.css";

const Card = (props) => {

     // const ms = props.date.map(day => (day.dt * 1000));
    // const weekdayName = new Date(ms).toLocaleString('ru', {weekday: 'long'});
    return (
        <div>
            <div className="current">
                <ul className={style.current}>
                    {props.current.map(item => (
                        <li key={item.id}>
                            <div className={style.main}>
                                <div className={style.main_weather}>
                                    <h2>{props.name}</h2>
                                    <h2>{Math.floor(item.temp)}°C</h2>
                                </div>
                                <div className={style.close} onClick={props.moreWeatherClose} >
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                            <div className={style.weather_now}>
                                <div className={style.date}>
                                    <h2>{props.currentDate}</h2>
                                    <h2>{props.currentTime}</h2>
                                </div>
                                <div className="description">
                                    <div className="img">
                                        <img src={`http://openweathermap.org/img/w/${item.img}.png`} alt=""/>
                                    </div>
                                    <p>Feels like: {Math.floor(item.feelsLike)}°C</p>
                                    <h4>{item.description}</h4>
                                    <p>Wind: {Math.floor(item.wind)} m/s</p>
                                </div>
                            </div>
                            <ul className={style.week}>
                                {props.date.map(day =>
                                    <li  className={style.day}>{new Date(day.dt * 1000).toDateString()}
                                        <div><img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt=""/></div>
                                        <h4>{day.weather[0].description}</h4>
                                        <p>Day: {Math.floor(day.temp.day)} °C</p>
                                        <p>Night: {Math.floor(day.temp.night)} °C</p>
                                    </li>)
                                }

                            </ul>

                        </li>
                    ))}
                </ul>

            </div>

        </div>

    );
};

export default Card;
