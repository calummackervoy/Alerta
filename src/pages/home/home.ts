import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import L from 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: any;
  hasMap: boolean;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
    this.hasMap = false;
  }

  clickButton() {
    if(this.hasMap === false) {
      this.hasMap = true;

      this.map = L.map('map', {
        center: [51.505, -0.09],
        zoom: 13
      });

      //zoom on user's position
      //this.map.locate({setView: true, maxZoom: 16});
    }

  }

  openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Update Map',
      buttons: [
        {
          text: 'Add Pin',
          handler: () => {
            console.log('Add Pin clicked');
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
