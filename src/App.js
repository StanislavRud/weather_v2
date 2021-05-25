import React, {Component} from 'react';
import './App.css';
import Search from "./components/Search/Search";
import {weatherAPI} from "./API/api";
import Weather from "./components/Weather/Weather";
import Card from "./components/Card/Card";

class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            citys: [],
            newCityText: '',
            current: [],
            week: [],
            name: '',
            notFound: null,
            currentTime: '',
            currentDate: ''
        }
    }

    onChangeCity = event => {
        this.setState({newCityText: event.target.value});
    };

    addCity = (e) => {
        e.preventDefault();
        this.moreWeatherClose();
        this.setState(state => {
            const city = state.newCityText;
            weatherAPI.getWeather(city)
                .then(data => {
                    this.setState({
                        citys: [...state.citys, {
                            id: data.id,
                            name: data.name,
                            temp: data.main.temp,
                            img: data.weather[0].icon,
                            description: data.weather[0].description,
                            feelsLike: data.main.feels_like,
                            tempMin: data.main.temp_min,
                            tempMax: data.main.temp_max,
                            pressure: data.main.pressure,
                            lat: data.coord.lat,
                            lon: data.coord.lon,
                            daily: data.daily
                        }]
                    })
                })
                .then(data => console.log(data));

            return {
                ...state,
                newCityText: '',

            };
        })
    };

    removeCity = (id) => {
        this.setState({
            citys: this.state.citys.filter(item => item.id !== id)
        });
        this.moreWeatherClose()
    };


    moreWeather = (id, name) => {
        setInterval(() => {this.getDate()}, 1000);
        let city = this.state.citys.filter(item => item.id === id);
        this.setState({
            current: [],
            week: [],
            name: null
        });

        this.setState(state => {
            weatherAPI.getHourlyWeather(city[0].lat, city[0].lon)
                .then(data => {
                    this.setState({
                        current: [...state.current, {
                            temp: data.current.temp,
                            feelsLike: data.current.feels_like,
                            img: data.current.weather[0].icon,
                            description: data.current.weather[0].description,
                            wind: data.current.wind_speed
                        }],
                        week: data.daily,
                        name: name
                    })
                });
            return {
                state,
            }
        })

    };

    moreWeatherClose = () => {
        this.setState({
            current: [],
            week: [],
            name: null
        });
    };

    getDate = () => {
        this.setState({
            currentTime: new Date().toLocaleTimeString('en-GB'),
            currentDate: new Date().toDateString()
        })
    }


    render() {

        return (

            <div className="App">
                <h1>Weather APP</h1>
                <Search newCityText={this.state.newCityText}
                        onChangeCity={this.onChangeCity.bind(this)}
                        addCity={this.addCity.bind(this)}/>

                <div className='wrapper'>

                    <Weather citys={this.state.citys}
                             removeCity={this.removeCity.bind(this)}
                             hourlyWeather={this.moreWeather.bind(this)}/>

                    <Card current={this.state.current}
                          date={this.state.week}
                          name={this.state.name}
                          moreWeatherClose={this.moreWeatherClose.bind(this)}
                          currentTime={this.state.currentTime}
                          currentDate={this.state.currentDate}
                    />
                </div>

            </div>
        );
    }
}

export default App;
