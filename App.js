import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {ScreenOrientation} from 'expo';
import {Clock} from './components/Clock'
import {BusTracker} from "./components/BusTracker";
import {Weather} from "./components/Weather";
import {News} from './components/News'
import {WeatherMini} from "./components/WeatherMini";
import * as Font from 'expo-font'
import * as Brightness from 'expo-brightness';

const imgStyle = {
  opacity: 0.3
};

const bigBoxStyle = {
  boxSizing: 'border-box',
  width: '100%',
  height: '100%'
};

const column = {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
};

const leftBox  = {
  flex:1,
  width: '75%'
};

const rightBox  = {
  width: '25%'
};

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      dateString: new Date(Date.now()).toLocaleString(),
      currWeatherIcon:'partly-cloudy-day',
      currWeatherTemp: -999,
      currWeatherFeelsLike: -999,
      fontLoaded: false
    }
  }

  changeCurrWeather = (icon, temp, feels) => {
    this.setState({
      currWeatherIcon: icon,
      currWeatherTemp: temp,
      currWeatherFeelsLike: feels,
      showF: true,
    });
  };

  async componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    const { status } = await Brightness.requestPermissionsAsync();
    if (status === 'granted') {
      Brightness.setSystemBrightnessAsync(0.5);
    }
    await Font.loadAsync({
      'product-sans': require('./assets/fonts/Product_Sans_Regular.ttf')
    }).then(() => this.setState({fontLoaded:true}))

    this.intervalID = setInterval(
      () => this.setState({dateString: new Date(Date.now()).toLocaleString()}),
      60000
    );

    this.intervalIDF = setInterval(
      () => this.invertF(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    clearInterval(this.intervalIDF);
  }

  invertF = () => {
    const {showF} = this.state;
    this.setState({
      showF: !showF
    })
  };

  render() {
    const {
      dateString,
      currWeatherIcon,
      currWeatherTemp,
      currWeatherFeelsLike,
      showF, fontLoaded} = this.state;

    if (!fontLoaded)
      return (
        <Text>Loading font {fontLoaded ? 'yup': 'nope'}</Text>
      );

    const now = new Date(Date.now());
    if (now.getHours() > 6 && now.getHours() < 16)
      Brightness.setSystemBrightnessAsync(1);
    else
      Brightness.setSystemBrightnessAsync(0.7);
    return(
      <ImageBackground
        source={{uri: 'https://source.unsplash.com/featured/1600x900/?nature,water$dateString='.concat(dateString)}}
        imageStyle={imgStyle}
        style={bigBoxStyle}>
        <View>
          <View style={column}>
            <View style={leftBox}>
              <View style={column}>
                <View style={leftBox}>
                  <Clock/>
                </View>
                <View style={rightBox}>
                  <WeatherMini currWeatherIcon={currWeatherIcon}
                               currWeatherTemp={currWeatherTemp}
                               currWeatherFeelsLike={currWeatherFeelsLike}
                               showF={showF}
                  />
                </View>
                <Weather
                  changeCurrWeather={this.changeCurrWeather.bind(this)}
                  showF={showF}
                />
              </View>
              <News/>
            </View>
            <View style={rightBox}>
              <BusTracker/>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

export default App;