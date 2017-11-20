import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  age: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    /*this.pin = navParams.get('pin');

    //if no pin parameter received flag error in text
    if(this.pin === undefined) {
      this.pin = new Pin(null, null);
      this.pin.name = "error";
      this.pin.details = "error";
      this.pin.age = new Date();
    }
    //otherwise calculate the age
    else if(this.pin.age !== undefined){
      this.pin.age = new Date(new Date().valueOf() - this.pin.age.valueOf());
    }*/

    this.name = navParams.get('name');
    this.details = navParams.get('details');
    this.age = navParams.get('age');

    //if no pin parameter received flag error in text
    if(this.name === undefined) this.name = "error";
    if(this.details === undefined) this.details = "error";
    if(this.age === undefined) this.age = new Date();
    else this.age = new Date(new Date().valueOf() - this.age.valueOf());
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewpinmodalPage');
  }

}
