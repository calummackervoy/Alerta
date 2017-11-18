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
  manualPos: boolean;

  constructor(public navCtrl: NavController, public params: NavParams,
      public map: Map) {
      this.pin = new Pin(new L.Marker(), new L.Circle());

      let e = params.get('latlng');

      if(e != undefined && e.lat != undefined &&
        e.lng != undefined) {
          this.setPos(e.lat, e.lng);
      }
      else {
        if(e == undefined) console.log("e undefined");
        else console.log("lat and/or lng undefined");
        this.manualPos = true;
      }
  }

  public setPos(lat: number, long: number): void {
    //bounds checking
    if(lat != undefined &&
      long != undefined) {
        //stops manual inputs for lat/long appearing
        this.manualPos = false;

        this.pin.latitude = lat;
        this.pin.longitude = long;
    }
    else console.log("undefined params passed to setPos");
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
