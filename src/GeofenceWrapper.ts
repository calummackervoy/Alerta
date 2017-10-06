import { Injectable } from "@angular/core";
import { Geofence } from '@ionic-native/geofence';

@Injectable()
export class GeofenceWrapper {
  //array of the geofences in use
  private geofences: Geofence[];
}
