import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {apiKeyNYT} from '../secrets'

const column = {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
};

const leftBox  = {
  flex:1,
  width: '7%',
  marginLeft: 6
};

const rightBox  = {
  width: '93%'
};

const textFont = {
  fontSize: 30,
  fontFamily:'product-sans'
};

const lineStyle = {
  backgroundColor:'black',
  height: 2,
  marginBottom: 8
};

const nyTimesLogoStyle = {
  width: 50,
  height: 50,
  marginTop: -5
};

export class News extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      latestTitle: '',
      lastUpdated: new Date(),
      results: [],
      resultsLength: 1,
      whichArticle: 0,
    };
    this.updateNews();
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.updateNews(),
      120000
    );

    this.interval2 = setInterval(
      () => this.updateWhich(),
      7000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
    clearInterval(this.interval2)
  }

  updateWhich = () => {
    const {whichArticle, resultsLength} = this.state;
    this.setState({
      whichArticle: (whichArticle + 1) % resultsLength
    })
  };

  updateNews = () => {
    var request = new Request('https://api.nytimes.com/svc/topstories/v2/national.json?api-key='.concat(apiKeyNYT), {method:'GET'});
    fetch(request)
      .then(response => response.json())
      .then(data => {
        this.setState({
          latestTitle: data.results[0].title,
          results: data.results,
          resultsLength: data.results.length,
          lastUpdated: new Date(),
          whichArticle: 0
        });
      }).catch(x => {
      return('no data')
    })
  };

  render() {
    const {results, whichArticle} = this.state;
    return (
      <View style={{marginTop: 510}}>
        <View style={lineStyle}/>
        <View style={column}>
          <View style={leftBox}>
            <Image
              style={nyTimesLogoStyle}
              source={require('../assets/nytimes.png')}
            />
          </View>
          <View style={rightBox}>
            <Text style={textFont}>
              {results[whichArticle] ? results[whichArticle].title : 'loading'}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}