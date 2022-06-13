import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

import Weather from './components/Weather';

import Geolocation from 'react-native-geolocation-service';

export default class App extends React.Component {
  

  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null,
    name: null,
    country: null
  };

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Gettig Weather Condtions'
        });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  fetchWeather(lat = 25, lon = 25) {

    var SITE_API_KEY = process.env.API_KEY;
    console.log(process.env);

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${"28643077d6936d2279056a7788fa22fc"}&units=metric`
    )
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false,
          name: json.name,
          country: json.sys.country
        });
        console.log(this.state)
      });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <Text>Fetching The Weather</Text> : <Weather weather={this.state.weatherCondition} temperature={this.state.temperature} name={this.state.name} country={this.state.country}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});