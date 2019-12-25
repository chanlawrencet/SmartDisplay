import React from 'react';
import {Text, View } from 'react-native';
import {getDayString, getMonthString} from "./helpers";

const numberStyle = {
  fontSize: 190,
  fontFamily: 'product-sans'
};

const ampmStyle = {
  fontSize: 60,
  fontFamily: 'product-sans'
};

export class Clock extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      time: '',
      timeString: '',
      ampm: '',
      date: '',
      day: '',
      month: '',
      year: ''
    }
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.updateTime(),
      1000
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  updateTime = () => {
    const timeDate = new Date();
    const timeHours = timeDate.getHours();
    const timeHoursString = timeHours > 0 && timeHours < 13 ?
                              timeHours.toString():
                                timeHours === 0 ?
                                  12 :
                                  timeHours - 12;
    const ampm = timeHours >= 0 && timeHours < 12 ? 'AM' : 'PM';

    const timeMinutes = timeDate.getMinutes();
    const timeMinutesString = timeMinutes < 10 ? '0'.concat(timeMinutes.toString()) : timeMinutes.toString();
    this.setState({
      time: timeHoursString.toString().concat(':').concat(timeMinutesString),
      timeString: timeDate.toString(),
      ampm: ampm,
      day: timeDate.getDay(),
      month: timeDate.getMonth(),
      date: timeDate.getDate(),
      year: timeDate.getFullYear(),
    })
  };

  render() {
    const {time, ampm, day, month, date} = this.state;
    return(
      <View>
        <View style={{alignItems:'center'}}>
          <Text >
            <Text style={numberStyle}>{time}</Text>
            <Text style={ampmStyle}>{ampm}</Text>
          </Text>
          <Text style={{fontSize: 40, marginTop: -20, fontFamily:'product-sans'}}>
            {getDayString(day)} {getMonthString(month)} {date}
          </Text>
        </View>
      </View>

    )
  }

}

