import React from 'react';
import { Text, View, Image} from 'react-native';
import {toCelsius, roundDecimal} from "./helpers";


const tempStyle = {
  fontSize: 20,
  fontFamily:'product-sans'
};

const hourStyle = {
  fontSize: 25,
  fontFamily:'product-sans'
};

const iconStyle = {
  width: 65,
  height: 65
};

export class HourlyWeather extends React.Component{

  render = () => {
    const {showF, currHour} = this.props;
    const date = new Date(0);
    date.setUTCSeconds(currHour.time);
    const dateString = date.getHours();

    const timeHoursString = dateString > 0 && dateString < 13 ?
      dateString.toString():
      dateString === 0 ?
        12 :
        dateString - 12;
    const ampm = dateString >= 0 && dateString < 12 ? 'AM' : 'PM';

    return(
      <View style={{borderColor: 'black', border: 4, flex:1, alignItems: 'center'}} key={date.toString()}>
        <Image
          source={{uri:'https://darksky.net/images/weather-icons/'.concat(currHour.icon, '.png')}}
          style={iconStyle}
        />
        <Text style={tempStyle}>
          {showF? roundDecimal(currHour.temperature) : toCelsius(currHour.temperature)}
          {showF ? '°F' : '°C'}
        </Text>
        <Text style={hourStyle}>{timeHoursString}{ampm}</Text>
      </View>
    )
  };
}