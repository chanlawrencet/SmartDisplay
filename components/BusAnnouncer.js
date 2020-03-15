import { Audio } from 'expo-av';

const SPEECH_MINUTES = 2;

export async function checkBusses(newData, statedTrips, newStatedTrip) {
  for (let i = 0, p = Promise.resolve(); i < newData.length; i++) {
    const currBus = newData[i];
    const timeToNewBus = getDifferenceRounded(currBus);
    const tripId = currBus.relationships.trip.data.id;
    const direction = currBus.attributes.direction_id === 1 ? 'inbound' : 'outbound';
    const route = currBus.relationships.route.data.id;

    if (timeToNewBus === SPEECH_MINUTES && !statedTrips.includes(tripId) && direction === 'inbound') {
      newStatedTrip(tripId)
      p = p.then(_ => new Promise(resolve =>
        setTimeout(function () {
          announce(direction, route, null);
          resolve();
        }, 5000)
      ));
    }
  }
}

function getDifferenceRounded(currBus){
  const now = new Date(Date.now());
  const busArrivalTime = new Date(currBus.attributes.arrival_time);
  const differenceMilliseconds = busArrivalTime - now;
  const differenceMinutes = differenceMilliseconds * (1.6666666 * Math.pow(10, -5));
  return(Math.round((differenceMinutes - 0.999)));
}

async function announce(inbound, route, time) {
  try {
    const soundObject1 = new Audio.Sound();
    switch (route) {
      case 'example':
        await soundObject1.loadAsync(require('file'));
        await soundObject1.playAsync();
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error)
  }
}