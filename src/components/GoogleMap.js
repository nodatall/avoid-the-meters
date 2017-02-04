import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import scriptLoader from 'react-async-script-loader'

export default class GoogleMap extends Component {

  componentDidMount() {
    window.initMap = this.initMap
    this.insertScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBH13poPYygIF6zKN0nol0czm5SFqWNXuY&callback=initMap')
  }

  insertScript( src ) {
    let referenceScript = window.document.getElementsByTagName("script")[0],
     script = window.document.createElement("script")

    script.src = src
    script.async = true
    referenceScript.parentNode.insertBefore(script, referenceScript)
  }

  initMap = () => {

    let mapStyle = [{
      'featureType': 'all',
      'elementType': 'all',
      'stylers': [{'visibility': 'on'}]
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
    }]

    const map = new google.maps.Map(this.refs.map, {
      center: {lat: 37.801327, lng: -122.274156},
      zoom: 15,
      styles: mapStyle
    })


  }

  render(){
    return(
      <div className="googleMap-mapContainer" ref="map"></div>
    )
  }
}
