import React from 'react';
import {Text, View, Image} from 'react-native';
import {toCelsius} from './helpers'


const weatherMiniStyle = {
  alignItems:'center', marginTop: 20, marginBottom: -50
};

const imageDimensions = {
  width:120,
  height:120
};

const tempFont = {
  fontSize: 40,
  fontFamily: 'product-sans'
};

const fFont = {
  fontSize: 20,
  fontFamily: 'product-sans'
};

export class WeatherMini extends React.Component{

  render() {
    const {currWeatherIcon, currWeatherTemp, currWeatherFeelsLike, showF} = this.props;
    return (
      <View style={weatherMiniStyle}>
        <Image
          source={{uri:'https://darksky.net/images/weather-icons/'.concat(currWeatherIcon, '.png')}}
          style={imageDimensions}
        />
        <Text style={tempFont}>
          {showF ? currWeatherTemp : toCelsius(currWeatherTemp)}{showF ? '°F' : '°C'}
        </Text>
        <Text style={tempFont}>
          {showF ? currWeatherFeelsLike : toCelsius(currWeatherFeelsLike)}{showF ? '°F' : '°C'}
        </Text>
        <Text style={fFont}>
          (Feels Like)
        </Text>
      </View>
    );
  }
}