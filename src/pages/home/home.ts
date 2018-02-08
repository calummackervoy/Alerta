import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { ActionSheetController, ModalController } from 'ionic-angular';
//import { Geofence } from '@ionic-native/geofence';
//import { GeofenceWrapper } from '../../GeofenceWrapper';
import { Map } from '../../Map';
import { GeolocationOptions } from '@ionic-native/geolocation';
import { AddpinmodalPage } from '../addpinmodal/addpinmodal';

/*const GEOLOCATION_OPTIONS: GeolocationOptions = {
   maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
};*/

//TODO: add toast notification https://ionicframework.com/docs/api/components/toast/ToastController/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  modal: any;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController, public map: Map, public events: Events) {
      events.subscribe('closemodal', () => {
        console.log("caught close event");
        this.onModalClose();
      });
  }

  ionViewDidLoad() {
    this.map.init();

    //set the click listener
    this.map.map.on('click', (e: any) => {
      //parameter is the map location of the click/tap
      this.createAddPinModal(e);
    });
  }

  /*openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Update Map',
      buttons: [
        {
          text: 'Add Pin',
          handler: () => {
            //menu to create pin without predefined location
            this.createAddPinModal(undefined);
          }
        },{
          text: 'Update Pin',
          handler: () => {
            console.log('Update Pin clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }*/

  //methods to create different modals
  createAddPinModal(e: any) {
    //make sure no other modal is active
    if(this.modal !== undefined) this.onModalClose();

    this.modal = this.modalCtrl.create(AddpinmodalPage, e);
    this.modal.present();
  }

  //event for modal self-closing
  onModalClose() {
    console.log("onModalClose called");
    if(this.modal !== undefined) {
      console.log("dismissing modal..");
      this.modal.dismiss();
    }
  }
}
