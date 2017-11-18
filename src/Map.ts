import { Injectable } from "@angular/core";
import L from 'leaflet';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation';
import { Pin } from './Pin';

//Purposes: manages the map & the geolocations attached to it

const DEFAULT_ZOOM = 13;

@Injectable()
export class Map {
  map: L.Map;
  centre: L.PointTuple;
  hasMap: boolean;
  pins: Pin[];

  constructor() {
    this.hasMap = false;
  }

  public addPin(latitude: number, longitude: number, details: string, name: string): void {
    console.log("adding pin using detailed parameters");
    let latlng = {lat: latitude, lng: longitude, date: new Date()};
    var pin = new Pin(new L.Marker(latlng).addTo(this.map),
      new L.Circle(latlng).setRadius(10).addTo(this.map));
    pin.age = pin.positionMarker.date;

    pin.latitude = latitude;
    pin.longitude = longitude;
    pin.details = details;
    pin.name = name;
    //console.log("latitude: " + this.pins[i].latitude);
    //console.log("longitude: " + this.pins[i].longitude);
    //console.log("details: " + this.pins[i].details);

    pin.id = this.pins.length;
    this.pins.push(pin);

    //TODO: set pin on-click to open a pin detail view
    //https://codedump.io/share/cXzrXfLOLC1e/1/ionic-2---leaflet-map-onclick-event
    //.on('click', showMarkerMenu)
  }

  init() {
    if(this.hasMap === false) {
      this.hasMap = true;

      this.centre = [51.505, -0.09]; //London
      this.map = L.map('map').setView(this.centre, DEFAULT_ZOOM);

      L.tileLayer('http://{s}.tile.cloudmade.com/e7b61e61295a44a5b319ca0bd3150890/997/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
      }).addTo(this.map);

      //initialise pins
      this.pins = [];
      /*for(var i = 0; i < MAX_PINS; i++) {
        this.pins[i] = null;
      }*/

      //add default pin
      this.addPin(51.505, -0.09, "Test details", "Central London");

      //zoom on user's position
      //this.map.locate({setView: true, maxZoom: 16});

      //add a geofence
      //TODO: make this a global object
      //var geo = new GeofenceWrapper(new Geofence());
      //geo.addGeofence();
    }

  }

  public updateGeoposition(index: number, position: Geoposition): void {
    //bounds checking
    if(index < 0 || index >= this.pins.length) return;

    //create Point
    let latlng = {lat: position.coords.latitude, lng: position.coords.longitude, date: new Date()};

    if (this.pins[index].positionMarker) {
      this.pins[index].positionMarker.setLatLng(latlng);
      this.pins[index].positionAccuracyCircle.setLatLng(latlng).setRadius(position.coords.accuracy);
    } else {
      this.pins[index].positionMarker = L.marker(latlng).addTo(this.map);
      this.pins[index].positionAccuracyCircle = L.circle(latlng, {radius: position.coords.accuracy}).addTo(this.map);
    }

    //Set Center
    this.map.setView(latlng, DEFAULT_ZOOM);
  }

  public removePin(index: number) : void {
    //bounds checking
    if(index < 0 || index >= this.pins.length) return;

    this.pins[index] = null;
  }

  //swap a specific pin for a new version
  public swapPin(index: number, pin: Pin) : void {
    this.removePin(index);
    this.addPin(pin.latitude, pin.longitude, pin.details, pin.name);
  }

  public centreOnPin(index: number) : void {
    //bounds checking
    if(index < 0 || index >= this.pins.length) return;

    //centre on map
    console.log(index + "/" + this.pins.length);
    console.log(this.pins[index]);
    this.map.setView({
      lat: this.pins[index].latitude,
      lng: this.pins[index].longitude}, DEFAULT_ZOOM);
  }
}
