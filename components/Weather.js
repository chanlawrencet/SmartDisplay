import React from 'react';
import {Text, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {toCelsius, roundDecimal} from './helpers'
import {HourlyWeather} from "./HourlyWeather";
import {apiKeyDarkSky, lat, long} from '../secrets'

const numberStyle = {
  fontSize: 30,
  fontFamily:'product-sans'
};

const hourBox = {
  flex:1,
  flexDirection:'row',
  marginLeft: -20,
  marginRight: 5
};

export class Weather extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      todayWeatherSummary: '',
      todayWeatherHigh: -999,
      todayWeatherLow: -999,
      updatedTime: new Date(),
      hourly: [],
    };
    this.updateWeather();
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.updateWeather(),
      120000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }



  updateWeather = () => {
    const request = new Request('https://api.darksky.net/forecast/'.concat(apiKeyDarkSky,'/',lat,',%20', long), {method:'GET'});
    const {changeCurrWeather} = this.props;

    fetch(request)
      .then(response => response.json())
      .then(data => {
        this.setState({
          todayWeatherSummary: data.daily.data[0].summary,
          todayWeatherHigh: roundDecimal(data.daily.data[0].temperatureHigh),
          todayWeatherLow: roundDecimal(data.daily.data[0].temperatureLow),
          updatedTime: new Date(),
          hourly: data.hourly.data
        });
        changeCurrWeather(data.currently.icon, roundDecimal(data.currently.temperature), roundDecimal(data.currently.apparentTemperature))
      }).catch(x => {
      return('no data')
    })
  };


  render() {
    const {
      todayWeatherSummary,
      todayWeatherHigh,
      todayWeatherLow,
      hourly,
    } = this.state;
    const {showF} = this.props;
    return (
      <View>
        <View style={{backgroundColor:'black', height: 2, marginTop: 275}}/>
        <View style={{marginLeft: 20}}>
          <Text style={{marginTop: 10, fontSize: todayWeatherSummary.length < 50 ? 50 : 33, fontFamily:'product-sans'}}>{todayWeatherSummary}
          </Text>
          <Text style={numberStyle} >
            <AntDesign name="arrowup" size={32} color="black" />
            {showF ? todayWeatherHigh :toCelsius(todayWeatherHigh)}{showF ? '°F' : '°C'}
            <AntDesign name="arrowdown" size={32} color="black" />
            {showF ? todayWeatherLow :toCelsius(todayWeatherLow)}{showF ? '°F' : '°C'}
          </Text>
          <View style={hourBox}>
            {hourly.slice(0,8).map(currHour => <HourlyWeather currHour={currHour} showF={showF} key={Math.random()}/>)}
          </View>
        </View>
      </View>

    );
  }
}