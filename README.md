### Avoid parking meters

###### Run our App
* clone [repo](https://github.com/nodatall/avoid-the-meters) into local folder
```
$ yarn (or npm i if you are behind the times)
```
* Log into a google account
* Get an Google Maps API key [here](https://developers.google.com/maps/documentation/roads/get-api-key)
* Click 'Get a key' under API Keys
* In popup, create a new project called avoid-the-meters
* Copy the API key
* Create a .env file in root directory
* Paste into .env:
`
GOOGLE_API_KEY=YOUR API KEY
`

### Check for updated meter data
* Navigate to [open.oakland.org](http://data.openoakland.org/dataset/parking-meters/resource/abcb59e0-2d26-4180-a436-609a6044ef27)
* Check if year of data set is over 2015
* if so, download and overwrite file located at src/dataservices/meterData/parkingmeters.csv
* Convert CSV to js readable
```
$ yarn data
```

### You are ready to go!
```
$ yarn start
```
* Navigate to http://localhost:3001 in your browser

* ###Show all meters on map
  * hook into oakland API
  * hook into google maps API
    * display map in Front-End
    * input geo-data and get address

* ###Front-End
  * Big map in middle
  * Show/hide density colors
  * Show/hide meters


* ###Features
  * Enter an address and get meters within a certain distance
  * Color streets by density of parking meters
    * Green is no meters
    * Gradient red-orange-yellow-red

* ###Stretch
  * Potholes data
