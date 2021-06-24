import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Loading from './Loading';
import {Alert} from 'react-native';
import * as Location from "expo-location";
import axios from "axios";
import Weather from './Weather';

const API_KEY = "4d4d60726490b7f6cc61139e0a3328f0";

export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading : true
    };
  }
  getWeather = async(latitude, longitude) =>{
    const {
      data: {
        main: {temp},
        weather
      }
    } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);

    this.setState({
      isLoading:false, 
      temp, 
      condition:weather[0].main
    });
  }
  getLocation = async() =>{
    try {
      await Location.requestForegroundPermissionsAsync();
      const { coords : { latitude, longitude}} =  await Location.getCurrentPositionAsync();
      this.getWeather(latitude,longitude);
    }
    catch (error){
      
    }
  }
  componentDidMount(){
    this.getLocation();
  }
  render(){
    const { isLoading, temp, condition} = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} />
    );
  }
}