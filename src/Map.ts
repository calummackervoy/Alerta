import { Injectable } from "@angular/core";
import L from 'leaflet';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation';

//Purposes: manages the map & the geolocations attached to it

@Injectable()
export class Map {
  map: L.Map;
  centre: L.PointTuple;
  hasMap: boolean;
  positionMarker: L.Marker;
  positionAccuracyCircle: L.Circle;

  constructor() {
    this.hasMap = false;
  }

  init() {
    if(this.hasMap === false) {
      this.hasMap = true;

      this.centre = [51.505, -0.09]; //London
      this.map = L.map('map').setView(this.centre, 13);

      L.tileLayer('http://{s}.tile.cloudmade.com/e7b61e61295a44a5b319ca0bd3150890/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
      }).addTo(this.map);

      //zoom on user's position
      //this.map.locate({setView: true, maxZoom: 16});

      //add a geofence
      //TODO: make this a global object
      //var geo = new GeofenceWrapper(new Geofence());
      //geo.addGeofence();
      let pos = {
        coords: {
          longitude: this.centre[1],
          latitude: this.centre[0],
          accuracy: 10,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null
        },
        timestamp: null
      };
      this.updateGeoposition(pos);
    }

  }

  updateGeoposition(position: Geoposition) {
    console.log(position.coords.longitude + ' ' + position.coords.latitude);

    //create Point
    let latlng = {lat: position.coords.latitude, lng: position.coords.longitude, date: new Date()};

    if (this.positionMarker) {
      this.positionMarker.setLatLng(latlng);
      this.positionAccuracyCircle.setLatLng(latlng).setRadius(position.coords.accuracy);
    } else {
      this.positionMarker = L.marker(latlng).addTo(this.map);
      this.positionAccuracyCircle = L.circle(latlng, {radius: position.coords.accuracy}).addTo(this.map);
    }

    //Set Center
    this.map.setView(latlng, 13);
  }
}
