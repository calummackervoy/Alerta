import L from 'leaflet';

export class Pin {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  details: string;
  positionMarker: L.Marker;
  positionAccuracyCircle: L.Circle;
  age: Date;

  constructor(positionMarker: L.Marker, positionAccuracyCircle: L.Circle) {
    this.latitude = 55.8642;
    this.longitude = -4.2518;
    this.details = "";
    this.positionMarker = positionMarker;
    this.positionAccuracyCircle = positionAccuracyCircle;
  }
}
