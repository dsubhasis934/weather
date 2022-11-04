import React, { useState, useEffect } from 'react'
import { sunny, cloud, rainy, mist, thunderstrom, haze } from '../assets/image';
import { SpinnerDotted } from 'spinners-react';
import Searchbar from './Searchbar';

function Weatherdata() {
    const [search, setsearch] = useState("Kolkata");
    const [inputvalue, setinputvalue] = useState(null);
    const [weatherdata, setweatherdata] = useState(null);
    const [changeweather, setchangeweather] = useState(sunny);
    const [load, setload] = useState(true);
    const API_key = "5e756171e144d8d248cf1846ffbc53df";
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_key}`;
    useEffect(() => {
        const getdata = async (e) => {
            try {
                setload(false);
                const response = await fetch(API);
                const data = await response.json();
                setweatherdata(data);
                setload(true);
                console.log(weatherdata);

            } catch (error) {
                console.log(error);
            }
        }
        getdata();
    }, [search]);


    const aftersearch = () => {
        setsearch(inputvalue);
        setinputvalue("");
    }

    const getweatherdata = async (event) => {
        const weather = await weatherdata.weather[0].main;

        if (weather === "Haze") {
            setchangeweather(haze);
        } else if (weather === "Clear") {
            setchangeweather(sunny);
        } else if (weather == "Clouds") {
            setchangeweather(cloud);
        } else if (weather == "Mist") {
            setchangeweather(mist);
        }
        else if (weather == "Thunderstrom") {
            setchangeweather(thunderstrom);
        }
        else if (weather == "Rain") {
            setchangeweather(rainy);
        } else {
            setchangeweather(rainy);
        }
    }
    useEffect(() => {
        getweatherdata();
    }, [weatherdata]);


    const myStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),url(${changeweather})`

    };
    const myStyle2 = {
        backgroundSize: 'cover',
        backgroundPosition: `center`
    };


    return (
        <>
            {(!load) ? (<SpinnerDotted color="red" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />)
                : (weatherdata === null) ? (<div>
                    <Searchbar setinputvalue={setinputvalue} aftersearch={aftersearch} />
                    <h3>Oops!No cities found</h3>
                </div>) : (
                    <div>
                        <div className="container" style={{ ...myStyle, ...myStyle2 }}>
                            <Searchbar setinputvalue={setinputvalue} aftersearch={aftersearch} />

                            <div className="location">
                                <h3>{search}</h3>
                            </div>

                            <div className="info">
                                <div className="temparature">
                                    <div className="max-temp">
                                        <h3> Max Temparature</h3>
                                        <p>{weatherdata.main.temp_max}<span>℃</span></p>
                                    </div>
                                </div>
                                <div className="humidity">
                                    <h3>Humidity</h3>
                                    <p>{weatherdata.main.humidity}</p>
                                </div>
                                <div className="min-temp">
                                    <h3> Min Temparature</h3>
                                    <p>{weatherdata.main.temp_min}<span>℃</span></p>
                                </div>
                                <div className="rain">
                                    <h3>Weather</h3>
                                    <p>{weatherdata.weather[0].main}</p>
                                </div>
                            </div>


                        </div>
                    </div>)}
        </>)
}

export default Weatherdata
