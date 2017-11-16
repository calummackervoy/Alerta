import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Map } from '../../Map';

/**
 * Generated class for the AddpinmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addpinmodal',
  templateUrl: 'addpinmodal.html',
})
export class AddpinmodalPage {
  pin = {latitude: 51.505, longitude: -0.09};
  details: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public map: Map) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpinmodalPage');
  }

  submit() {
    //construct a geoposition from the form data
    let pos = {
      coords: {
        latitude: this.pin.latitude,
        longitude: this.pin.longitude,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null
      },
      timestamp: null
    };

    //TODO: store a pin & its associated details
    console.log("details received: " + this.details);

    //send this to Map
    this.map.updateGeoposition(pos);

    //TODO: self-close
  }

}
