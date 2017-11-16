import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { Geofence } from '@ionic-native/geofence';
import { GeofenceWrapper } from '../../GeofenceWrapper';
import { Map } from '../../Map';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation';
import { ModalController } from 'ionic-angular';
import { AddpinmodalPage } from '../addpinmodal/addpinmodal';

const GEOLOCATION_OPTIONS: GeolocationOptions = {
   maximumAge: 3000, timeout: 5000, enableHighAccuracy: true
};

//TODO: add toast notification https://ionicframework.com/docs/api/components/toast/ToastController/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController, public map: Map) {
  }

  ionViewDidLoad() {
    this.map.init();
  }

  openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Update Map',
      buttons: [
        {
          text: 'Add Pin',
          handler: () => {
            let modal = this.modalCtrl.create(AddpinmodalPage);
            modal.present();
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
  }
}
