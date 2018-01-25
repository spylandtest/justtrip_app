import { Component } from '@angular/core';
//import { NavController, NavParams } from 'ionic-angular';
import { IonicPage,NavController, LoadingController,Loading, ToastController,NavParams,AlertController} from "ionic-angular";

/**
 * Generated class for the BikeuserdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-bikeuserdetails',
  templateUrl: 'bikeuserdetails.html',
})
export class BikeuserdetailsPage {
  loading: Loading;
  createSuccess = false;
  search;
  locationinfoList;
  bikesearchList;
  searchbikevalues;
  leftdays;
  hours;
  bikerent;
  dateIntval;
  timeIntval;
  finalbikeprice;
  bikeuserDetails = {name: '',email: '',mobileno: '',paymentmode: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

    this.search = navParams.get('search');
    this.bikesearchList = navParams.get('bikesearchList');
    this.locationinfoList = navParams.get('locationinfoList');
    this.searchbikevalues = navParams.get('searchbikevalues');
    this.leftdays = navParams.get('leftdays');
    this.hours = navParams.get('hours');
    this.dateIntval = navParams.get('dateIntval');
    this.timeIntval = navParams.get('timeIntval');
    this.finalbikeprice = (this.search.dayrent*this.dateIntval)+(this.search.statingPrice*this.timeIntval);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BikeuserdetailsPage');
  }

}
