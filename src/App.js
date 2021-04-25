import React, {Component} from 'react';
import './App.css';
import Comp1 from "./components/comp1/Comp1";
import Search from "./components/Search/Search";
import {weatherAPI} from "./API/api";
import Weather from "./components/Weather/Weather";

class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            citys: [
                // {id: 1, name: 'Sum', temp: 10},
                // {id: 2, name: 'Kha', temp: 12}
            ],
            newCityText: ''
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
                            description: data.weather[0].description
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

    render() {
        return (
            <div className="App">
                <h1>Weather APP</h1>
                {/*<Comp1 />*/}
                <Search newCityText={this.state.newCityText}
                        onChangeCity={this.onChangeCity.bind(this)}
                        addCity={this.addCity.bind(this)}/>
                <Weather citys={this.state.citys} removeCity={this.removeCity.bind(this)}/>
            </div>
        );
    }
}

export default App;
