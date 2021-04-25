import * as axios from "axios";


const key = 'a4d224bd039582b9fbce363660b9bbcc';

const instance = axios.create({
    baseURL: "http://api.openweathermap.org/data/2.5/",

});

export const weatherAPI = {
    getWeather(city) {
        return instance.get(`weather?q=${city}&APPID=${key}&units=metric`)
            .then(response => {
                return response.data
            });
    },
};
