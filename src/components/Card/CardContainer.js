import React from 'react';
import {weatherAPI} from "../../API/api";
import Card from "./Card";


class CardContainer extends React.Component {

    state = {
        current: [],
        week: []
    }



    componentDidMount = () => {

        let lat = 50.9216;
        let lon = 34.8003;

        this.setState(state => {
            weatherAPI.getHourlyWeather(lat, lon)
                .then(data => {
                    this.setState({
                        current: [...state.current, {
                            temp: data.current.temp,
                            feelsLike: data.current.feels_like,
                            img: data.current.weather[0].icon,
                            description: data.current.weather[0].description,
                            wind: data.current.wind_speed
                        }],
                        week: data.daily
                    })
                });
            return {
                state,
            }
        })

    };

    render() {
        console.log(this.state)
        return (

            <div className="container">
                <Card current={this.state.current} date={this.state.week}/>
            </div>
        );
    }
}

export default CardContainer;
