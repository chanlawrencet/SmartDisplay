import React from 'react';
import {Text, View, Button } from 'react-native';
import {FontAwesome} from '@expo/vector-icons'
import {busStops} from '../secrets'
import { checkBusses } from "./BusAnnouncer";

const column = {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start'
};

const leftBox  = {
  flex:1,
  width: '50%',
};

const rightBox  = {
  width: '50%'
};

const busNumFont = {
  fontSize: 50,
  fontFamily:'product-sans'
};

const busTimeFont = {
  fontSize: 50,
  fontFamily:'product-sans'
};

const inboundStyle = {
  fontSize: 30,
  marginBottom: -10,
  fontFamily:'product-sans'
};

const outboundStyle = {
  fontSize: 30,
  marginTop: 10,
  marginBottom: -10,
  fontFamily:'product-sans'
};

const lastUpdatedStyle = {
  marginTop: 12,
  fontFamily:'product-sans'
};

export class BusTracker extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      updatedTime: new Date(Date.now())   ,
      updatedTimeDifference: 0,
      statedTrips: [],
    }
  }


  // note: will also recycle when necessary
  addStatedTrips(tripId){
    let {statedTrips} = this.state;

    if (statedTrips.length > 100){
      statedTrips = [];
    }

    statedTrips.push(tripId);
    this.setState({
      statedTrips: statedTrips,
    })
  }

  requestBus = () => {
    const {statedTrips} = this.state;
    this.setState({
      next: 'updating....'
    });
    var request = new Request('https://api-v3.mbta.com/predictions?filter%5Bstop%5D='.concat(busStops), {method:'GET'});
    fetch(request)
      .then(response => response.json())
      .then(data => {
        var theDate = new Date(data.data[0].attributes.arrival_time);
        this.setState({
          data: data.data,
          updatedTime: new Date(Date.now())
        });
        checkBusses(data.data, statedTrips, this.addStatedTrips.bind(this));
      }).catch(x => {
      return('no data')
    })
  };

  componentDidMount() {
    this.requestBus();
    this.intervalID = setInterval(
      () => this.requestBus(),
      20000
    )

    this.intervalID2 = setInterval(
      () => this.lastUpdatedUpdate(),
      2000
    )
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
    clearInterval(this.intervalID2)
  }

  lastUpdatedUpdate = () => {
    const {updatedTime} = this.state;
    const now = new Date(Date.now())
    const secondsDifference = Math.round((now - updatedTime) * Math.pow(10, -3))

    this.setState({
      updatedTimeDifference: secondsDifference
    })
  }

  makeBus = currBus => {
    const now = new Date(Date.now());
    const busArrivalTime = new Date(currBus.attributes.arrival_time);
    const differenceMilliseconds = busArrivalTime - now;
    const differenceMinutes = differenceMilliseconds * (1.6666666 * Math.pow(10, -5));
    const differenceMinutesRounded = Math.round((differenceMinutes - 0.999));
    return(
      <View style={{  marginBottom: 50}} key={currBus.relationships.trip.data.id}>
        <View style={column}>
          <View style={leftBox}>
            <Text style={busNumFont}>{currBus.relationships.route.data.id}</Text>
          </View>
          <View style={rightBox}>
            <Text>
              <Text style={busTimeFont}>{differenceMinutesRounded}</Text>
              <Text style={{fontFamily:'product-sans'}}>min</Text>
            </Text>
          </View>
        </View>
        <View style={{backgroundColor: 'black', height:2, marginTop: 52}}/>
      </View>
    )
  };

  render() {
    const {data, updatedTimeDifference} = this.state;

    return(
      <View style={{marginTop: 5}}>
        <Text style={inboundStyle}>
          Inbound &nbsp;
          <FontAwesome style={{marginLeft:200}} name="bus" size={25} color="black" />
        </Text>
        {data.filter(currBus => currBus.attributes.direction_id === 1).slice(0, 5).map(x => this.makeBus(x))}

        <Text style={outboundStyle}>
          Outbound &nbsp;
          <FontAwesome style={{marginLeft:200}} name="bus" size={25} color="black" />
        </Text>
        {data.filter(currBus => currBus.attributes.direction_id === 0).slice(0, 5).map(x => this.makeBus(x))}

        <Text style={lastUpdatedStyle}>
          Last Updated: {updatedTimeDifference} {updatedTimeDifference === 1 ? 'second' : 'seconds'} ago
        </Text>
      </View>
    )
  }
}