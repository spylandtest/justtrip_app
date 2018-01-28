import { Component } from '@angular/core';
//import { NavController, NavParams } from 'ionic-angular';
import { IonicPage,NavController, LoadingController,Loading, ToastController,NavParams,AlertController} from "ionic-angular";
import {CheckoutBikePage} from "../checkout-bike/checkout-bike";
import { BikebookingserviceProvider } from '../../providers/bikebookingservice/bikebookingservice';
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
  //leftdays;
  leftdays = 1;
  hours;
  bikerent;
  dateIntval;
  timeIntval;
  finalbikeprice;
  bikepaymentList=[];
  bikeuserDetails = {name: '',email: '',mobileno: '',paymentmode: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController,private bikebookingsubmit: BikebookingserviceProvider,) {

   
    this.search = navParams.get('search');
    this.bikesearchList = navParams.get('bikesearchList');
    this.locationinfoList = navParams.get('locationinfoList');
    this.searchbikevalues = navParams.get('searchbikevalues');
    //this.leftdays = navParams.get('leftdays');
    this.hours = navParams.get('hours');
    this.dateIntval = navParams.get('dateIntval');
    this.timeIntval = navParams.get('timeIntval');
    this.finalbikeprice = (this.search.dayrent*this.dateIntval)+(this.search.statingPrice*this.timeIntval);
    console.log(this.search);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BikeuserdetailsPage');
  }

  public bikebookingView(search) {
    
        console.log(this.searchbikevalues);
        console.log(this.finalbikeprice);
        console.log(this.bikeuserDetails);
        console.log(this.search);
        console.log(this.leftdays);
        console.log(this.hours);
    
        this.showLoading()
        this.bikebookingsubmit.bikebookingView(this.search,this.searchbikevalues,this.finalbikeprice,this.bikeuserDetails,this.leftdays,this.hours,this.bikesearchList).subscribe(res => {
        let success = res['access'];
            
        if (success) {
        
          this.bikepaymentList = res['bikepaymentList'];
              this.createSuccess = true;
              setTimeout(() => {
              this.loading.dismiss();
           });
           
           console.log(this.bikepaymentList);
           this.navCtrl.push(CheckoutBikePage,{search,paymentList: this.bikepaymentList,searchbikeDetails: this.searchbikevalues,finalbikeprice: this.finalbikeprice,bikeuserDetails: this.bikeuserDetails});
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
      //  this.navCtrl.push(SearchPage, {searchList: this.searchList,searchDetails: this.searchDetails});
    //     this.nav.setRoot(ListTodayBooksPage,{shopId});
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
       this.navCtrl.popToRoot();
     }
   }
 }
]
});
alert.present();
}


}
