import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Pin } from '../../Pin';

/**
 * Generated class for the ViewpinmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewpinmodal',
  templateUrl: 'viewpinmodal.html',
})
export class ViewpinmodalPage {
  name: string;
  details: string;
  timestamp: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events) {
    /*this.pin = navParams.get('pin');

    //if no pin parameter received flag error in text
    if(this.pin === undefined) {
      this.pin = new Pin(null, null);
      this.pin.name = "error";
      this.pin.details = "error";
      this.pin.timestamp = new Date();
    }
    //otherwise calculate the age
    else if(this.pin.timestamp !== undefined){
      this.pin.timestamp = new Date(new Date().valueOf() - this.pin.timestamp.valueOf());
    }*/

    this.name = navParams.get('name');
    this.details = navParams.get('details');
    this.timestamp = navParams.get('age');

    //if no pin parameter received flag error in text
    if(this.name === undefined) this.name = "error";
    if(this.details === undefined) this.details = "error";
    if(this.timestamp === undefined) this.timestamp = new Date();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewpinmodalPage');
  }

  dismiss() {
    //console.log("emitting close event");
    this.events.publish('closemodal', null);
  }

}
