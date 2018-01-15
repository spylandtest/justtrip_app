import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavController, AlertController, Loading, LoadingController,NavParams,IonicPage } from 'ionic-angular';
import {BikesPage} from "../bikes/bikes";
import { SearchbikeserviceProvider } from '../../providers/searchbikeservice/searchbikeservice';
/**
 * Generated class for the SearchBikePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-bike',
  templateUrl: 'search-bike.html',
})
export class SearchBikePage {
  loading: Loading;
  createSuccess = false;
  searchbikevalues ={location: "",pickupdate: "",dropdate: "" }
  bikesearchList = [];
  locationinfoList = [];
  cityList=[];
  

  constructor(public nav: NavController,public navParams: NavParams, private alertCtrl: AlertController, private searchbikeservice: SearchbikeserviceProvider, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchBikePage');
  }

//search
public bikesearchdetails() {
  this.showLoading()
this.searchbikeservice.bikesearchdetails(this.searchbikevalues).subscribe(res => {
let success = res['access'];


if (success) {

  this.bikesearchList = res['bikesearchList'];
  this.locationinfoList = res['locationinfoList'];
      this.createSuccess = true;
      setTimeout(() => {
      this.loading.dismiss();
   });
   console.log(this.bikesearchList);
   console.log(this.locationinfoList);
   console.log(this.searchbikevalues);
   console.log('hi test bikes');
   

   this.nav.push(BikesPage, {bikesearchList: this.bikesearchList,searchbikevalues: this.searchbikevalues,locationinfoList:this.locationinfoList});
  // this.showPopup("Success", "Successfully Registered");
} else {
  let message = res['message'];
  if(message)
  {
     setTimeout(() => {
      this.loading.dismiss();
   });
   this.showPopup("Error",message);
  }
 else
 {
    setTimeout(() => {
      this.loading.dismiss();
   });
   this.showPopup("Error", "Problem creating account.");
 }
}
},
error => {
setTimeout(() => {
      this.loading.dismiss();
   });
this.showPopup("Error", error);
});
}

showLoading() {
  this.loading = this.loadingCtrl.create({
  content: 'Please wait...'
 });
  this.loading.present();
}

showPopup(title, text) {
let alert = this.alertCtrl.create({
title: title,
subTitle: text,
buttons: [
 {
   text: 'OK',
   handler: data => {
     if (this.createSuccess) {
       this.nav.popToRoot();
     }
   }
 }
]
});
alert.present();
}

}
