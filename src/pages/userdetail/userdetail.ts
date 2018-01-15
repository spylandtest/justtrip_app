import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,NavParams,IonicPage } from 'ionic-angular';
import { CarsPage } from '../../pages/cars/cars';
import { SearchCarsPage } from '../../pages/search-cars/search-cars';
//import {CarDetailPage} from "../car-detail/car-detail";
import { BookingsubmittserviceProvider } from '../../providers/bookingsubmittservice/bookingsubmittservice';
import {CheckoutCarPage} from "../checkout-car/checkout-car";

/**
 * Generated class for the UserdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdetail',
  templateUrl: 'userdetail.html',
})
export class UserdetailPage {

  search;
  searchDetails;
  cityList;
  loading: Loading;
  createSuccess = false;
  paymentList=[];
  userDetails = {name: '',email: '', mobileno: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private bookingsubmit: BookingsubmittserviceProvider, private loadingCtrl: LoadingController) {
    this.search = navParams.get('search');
    this.searchDetails = navParams.get('searchDetails');
    this.cityList = navParams.get('cityList');
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdetailPage');
  }

  public bookingView(search) {
    
        console.log(this.searchDetails);
        console.log(this.cityList);
        console.log(this.userDetails);
        console.log(this.search);
    
        this.showLoading()
        this.bookingsubmit.bookingView(this.search,this.searchDetails,this.cityList,this.userDetails).subscribe(res => {
        let success = res['access'];
            
        if (success) {
        
          this.paymentList = res['paymentList'];
              this.createSuccess = true;
              setTimeout(() => {
              this.loading.dismiss();
           });
           
           console.log(this.paymentList);
           this.navCtrl.push(CheckoutCarPage,{search,paymentList: this.paymentList,searchDetails: this.searchDetails,cityList: this.cityList,userDetails: this.userDetails});
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
