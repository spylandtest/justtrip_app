import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NavController, AlertController, Loading, LoadingController,NavParams,IonicPage } from 'ionic-angular';
import { PaymentcompleteserviceProvider } from '../../providers/paymentcompleteservice/paymentcompleteservice';
import {HomePage} from "../home/home";
/**
 * Generated class for the PaysuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paysuccess',
  templateUrl: 'paysuccess.html',
})
export class PaysuccessPage {

  url;
  search;
  searchDetails;
  cityList;
  userDetails;
  paymentList;
  loading: Loading;
  createSuccess = false;
  inAppBrowserRef;
  payment=[];
  payment_id;


  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, private loadingCtrl: LoadingController,private paymentview: PaymentcompleteserviceProvider) {

    this.search = navParams.get('search');
    this.searchDetails = navParams.get('searchDetails');
    var searchDetails = JSON.stringify(searchDetails); 
    this.cityList = navParams.get('cityList');
    this.userDetails = navParams.get('userDetails');
    var userDetails = JSON.stringify(userDetails); 
    this.paymentList = navParams.get('paymentList');
    this.url = this.paymentList.url;
    this.payment_id =navParams.get('payment_id');
    var payment_id = JSON.stringify(payment_id); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaysuccessPage');
  //  this.paymentcomplete();
  }
  backtohome() {
    this.navCtrl.push(HomePage);
  }
  public paymentcomplete(){
console.log(this.payment_id);
console.log(this.paymentList);
    this.paymentview.paymentcomplete(this.payment_id,this.userDetails,this.paymentList).subscribe(res => {
      let success = res['access'];
     if (success) {
           
      this.payment = res['payment'];
              
        console.log(this.payment);
            setTimeout(() => {
              this.loading.dismiss();
         });
       //this.showPopup("Success", "Successfully Added");
     } else {
       
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
             this.navCtrl.popToRoot();
           }
         }
       }
     ]
    });
    alert.present();
  }
}
