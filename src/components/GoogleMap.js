import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import scriptLoader from 'react-async-script-loader'

export default class GoogleMap extends Component {
  componentDidMount() {
          // Connect the initMap() function within this class to the global window context,
          // so Google Maps can invoke it
          window.initMap = this.initMap
          // Asynchronously load the Google Maps script, passing in the callback reference
          loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBH13poPYygIF6zKN0nol0czm5SFqWNXuY&callback=initMap')
          
      }

    initMap = () => {
      // load the map
      const map = new google.maps.Map(ReactDOM.findDOMNode(this), {
        center: {lat: 40, lng: -100},
        zoom: 4,
        styles: mapStyle
      });
      console.log('WE ARE HERE')

      var mapStyle = [{
        'featureType': 'all',
        'elementType': 'all',
        'stylers': [{'visibility': 'off'}]
      }, {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
      }, {
        'featureType': 'water',
        'elementType': 'labels',
        'stylers': [{'visibility': 'off'}]
      }, {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [{'visibility': 'on'}, {'hue': '#5f94ff'}, {'lightness': 60}]
      }];
  }

  render(){
    return(
      <div>
        <div ref="map"></div>
      </div>
    )
  }
}

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
