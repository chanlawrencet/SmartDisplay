# SmartDisplay
I got tired of having to rely on third parties (namely Amazon and Google) to supply fun smart display functionalities.
Living outside of an MBTA bus stop, I wanted to pull the api to get times when the bus would come. Current 
features of current smart displays don't even include this functionality. 
What if I made my own? I bought a $30 Amazon fire tablet and wrote an app to display pernamently on the tablet.
There's a mode to keep it on while plugged in; I turned that on too.

![Screenshot of app](https://raw.githubusercontent.com/chanlawrencet/SmartDisplay/master/screenshot.png)
![Image of app](https://github.com/chanlawrencet/SmartDisplay/blob/master/image.jpg)
(trust me, it looks better without the camera showing the pixels)

## Features
* Big persistent time
* Date
* Current weather (temp, feels like, highs/lows, descriptive)
* Weather for the next 6 hours
* NYTimes national news feed
* Arrival times for busses going inbound / outbound from stops specified
* Alternating C and F termperatures
* Rotating images based on current weather
* Increses brightness from 6am-5pm
* Also note: really customized for Fire 7; probably won't work with other tablets because of different resolutions and pixel densities. I probably could have made this responsive, but really didn't feel like it...
## Secrets file
The secrets file, `secrets.js`, stored at the root, has the following format:
```
export const apiKeyNYT = 'ABCDE';
export const apiKeyDarkSky = 'ABCDE';
export const lat = '11111';
export const long = '11111'; // like 12.1231312
export const busStops = '11111,11111'; // comma separated MBTA stop IDs
```
You don't need an api key for MBTA; their current rate limiting is totally fine for my purposes.

## To run
```
yarn
yarn start
```
You'll probably need expo-cli too.
## Refresh times
* NYT - every 2 minutes, it pulls; changes the article every 7 seconds
* DarkSky - every 2 minutes
* MBTA - every 10 seconds

## Next steps
* Announce the time via a audio recording?

## Thanks
* NYT for news data
* DarkSky for weather data
* MBTA for bus data
* Unsplash for background images
