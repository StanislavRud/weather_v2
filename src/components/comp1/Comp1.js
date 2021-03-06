import React, {Component} from 'react';
import {weatherAPI} from "../../API/api";


class Comp1 extends Component {
    constructor(props) {

        super(props);
        this.state = {
            citys: [],
            newCityText: ''
        }
    }

    onChangeCity = event => {
        this.setState({newCityText: event.target.value});
    };

    addCity = () => {
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
            <div>
                {/*<ul>*/}
                {/*    {this.state.citys.map(item => (*/}
                {/*        <li key={item.id}>{item.name} Temp: {item.temp}°C*/}
                {/*            <img src={`http://openweathermap.org/img/w/${item.img}.png`} alt=""/>*/}
                {/*            <h4>{item.description}</h4>*/}
                {/*            <button*/}
                {/*                onClick={() => this.removeCity(item.id)}*/}
                {/*            >Delete*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
                {/*<input type="text"*/}
                {/*       value={this.state.newCityText}*/}
                {/*       onChange={this.onChangeCity}*/}
                {/*/>*/}
                {/*<button*/}
                {/*    onClick={this.addCity}*/}
                {/*>Add City*/}
                {/*</button>*/}
            </div>
        );
    }
}

export default Comp1;