import { Injectable } from "@angular/core";
import { Geofence } from '@ionic-native/geofence';

@Injectable()
export class GeofenceWrapper {
  //array of the geofences in use
  private geofences: Geofence[];

  constructor(private geofence: Geofence) {
    // initialize the plugin
    geofence.initialize().then(
      // resolved promise does not return a value
      () => console.log('Geofence Plugin Ready'),
      (err) => console.log(err)
    );
  }

  public addGeofence() {
    //TODO: pass options in
    //TODO: more data about a pin e.g. direction of travel
    let fence = {
      //TODO: generate ID
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude:       51.505, //center of geofence radius
      longitude:      -0.09,
      radius:         100, //radius to edge of geofence in meters
      transitionType: 3, //1 = enter, 2 = leave, 3 = both
      notification: { //notification settings
          id:             1, //any unique ID
          title:          'You crossed a fence', //notification title
          text:           '& Now youre getting a notification', //notification body
          openAppOnClick: true //open app when notification is tapped
      }
    }

    this.geofence.addOrUpdate(fence).then(
       () => console.log('Geofence added'),
       (err) => console.log('Geofence failed to add ' + err)
     );
  }
}
