import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from './Button'
import meterData from '../dataServices/meterData/data'
var Config = require('Config')


export default class GoogleMap extends Component {
  constructor() {
    super()
    this.state = {
      meterData,
      metersVisible: true,
      metersArray: [],
      map: null,
      headingVisibility: 'visible'
    }
  }

  componentDidMount() {
    window.initMap = this.initMap
    this.insertScript(`https://maps.googleapis.com/maps/api/js?key=${Config.google_api_key}&callback=initMap`)
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
    },
    {
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

    let map = new google.maps.Map(this.refs.map, {
      center: {lat: 37.801327, lng: -122.274156},
      zoom: 15,
      styles: mapStyle
    })

    const meterIcon = 'tinyMeter.png'
    let meters = []

    this.state.meterData.forEach( meter => {
      let marker = new google.maps.Marker({
        position: {lat: Number(meter.latitude), lng: Number(meter.longitude)},
        map: map,
        icon: meterIcon
      })
      meters.push(marker)
    })

    this.setState({
      metersArray: meters,
      map
    })

  }

  addMarkersToMap = ( map ) => {
    const markers = this.state.metersArray
    for (let index = 0; index < markers.length; index++) {
      markers[index].setMap(map)
    }
  }

  toggleMeters = () => {
    if ( this.state.metersVisible ) {
      this.addMarkersToMap( null )
      this.toggleVisibility()
    } else {
      this.addMarkersToMap( this.state.map )
      this.toggleVisibility()
    }
  }

  toggleVisibility = () => {
    this.setState({
      metersVisible: !this.state.metersVisible
    })
  }

  render(){
    const buttonContent = this.state.metersVisible ? 'Hide Meters' : 'Show Meters'

    window.setTimeout( () => {
      this.setState({
        headingVisibility: 'hidden'
      })
    }, 3000)

    return(
      <div className="appContainer">
        <h1 className={`heading-${this.state.headingVisibility}`} >Oakland Parking Meter Map</h1>
        <div className="googleMap-mapContainer" ref="map"></div>
        <div className="buttons-container">
          <Button onClick={this.toggleMeters} >
            {buttonContent}
          </Button>
        </div>
      </div>
    )
  }
}
