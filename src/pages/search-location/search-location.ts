import {Component} from "@angular/core";
//import {NavController} from "ionic-angular";
import { NavController, AlertController, Loading, LoadingController,NavParams,IonicPage } from 'ionic-angular';
import { LocationserviceProvider } from '../../providers/locationservice/locationservice';

@Component({
  selector: 'page-search-location',
  templateUrl: 'search-location.html'
})

export class SearchLocationPage {

  cataloglist= [];
  cityList=[];
  loading: Loading;
  createSuccess = false;
  // places
  public places = {
  /*  nearby: [
      {
        id: 1,
        name: "Current Location"
      },
      {
        id: 2,
        name: "Rio de Janeiro, Brazil"
      },
      {
        id: 3,
        name: "São Paulo, Brazil"
      },
      {
        id: 4,
        name: "New York, United States"
      },
      {
        id: 5,
        name: "London, United Kingdom"
      }
    ],*/
   /* recent: [
      {
        id: 1,
        name: "Rio de Janeiro"
      }
    ] */
  };

  constructor(public nav: NavController,public navParams: NavParams, private alertCtrl: AlertController, private location: LocationserviceProvider, private loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Carrent page');
    this.getLocationDetail();
  }

  public getLocationDetail() {
    this.showLoading()
this.location.getLocationDetail().subscribe(res => {
 let success = res['access'];
if (success) {
      // this.cataloglist = res['catalogList'];
         this.cityList = res['cityList'];
         
         
   console.log(this.cityList);
       setTimeout(() => {
        this.loading.dismiss();
    });
  //this.showPopup("Success", "Successfully Added");
} else {
  setTimeout(() => {
    this.loading.dismiss();
});
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
  // search by item
  searchBy(id) {
    // go back search hotel page
    this.nav.pop();
  }
}
