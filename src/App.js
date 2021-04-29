import React, {Component} from 'react';
import './App.css';
import Search from "./components/Search/Search";
import {weatherAPI} from "./API/api";
import Weather from "./components/Weather/Weather";
import {Route} from "react-router-dom";
import CardContainer from "./components/Card/CardContainer";

class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            citys: [],
            newCityText: '',
        }
    }

    onChangeCity = event => {
        this.setState({newCityText: event.target.value});
    };

    addCity = (e) => {
        e.preventDefault();
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
                });

            return {
                ...state,
                newCityText: '',
            };
        })
    };

    removeCity = (id) => {
        this.setState({
            citys: this.state.citys.filter(item => item.id !== id)
        })
    };


    moreWeather = (id) => {

        let city = this.state.citys.filter(item => item.id === id);
        debugger

    };


    render() {

        return (
            <div className="App">
                <h1>Weather APP</h1>
                <Search newCityText={this.state.newCityText}
                        onChangeCity={this.onChangeCity.bind(this)}
                        addCity={this.addCity.bind(this)}/>

                <div className='wrapper'>
                    <Route path='/'
                           render={() => <Weather citys={this.state.citys}
                                                  removeCity={this.removeCity.bind(this)}
                                                  hourlyWeather={this.moreWeather.bind(this)}/>}/>
                    <Route path='/info'
                           render={() => <CardContainer />}/>
                </div>

            </div>
        );
    }
}

export default App;
