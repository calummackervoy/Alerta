import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import L from 'leaflet';
import { Map } from '../../Map';
import { Pin } from '../../Pin';

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
  pin: Pin;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public map: Map) {
      this.pin = new Pin(new L.Marker(), new L.Circle());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddpinmodalPage');
  }

  submit() {
    console.log("submit clicked " + this.pin.latitude + ", " + this.pin.longitude);

    //send this to Map
    this.map.addPin(this.pin.latitude, this.pin.longitude, this.pin.details);
    //this.map.updateGeoposition(0, pos);

    //TODO: self-close
  }

}
