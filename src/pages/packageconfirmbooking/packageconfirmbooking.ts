import { Component } from '@angular/core';
import { NavController, AlertController, Loading, LoadingController,NavParams,IonicPage } from 'ionic-angular';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PackagepaymentmodePage } from "../packagepaymentmode/packagepaymentmode";
import {HomePage} from "../home/home";
//import { PaysuccessPage } from "../paysuccess/paysuccess";

import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { Platform } from 'ionic-angular';
import { PaymentpackageserviceProvider } from '../../providers/paymentpackageservice/paymentpackageservice';

declare var cordova: any;
//declare var RazorpayCheckout: any;
declare var RazorpayCheckout: any;


/**
 * Generated class for the PackageconfirmbookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-packageconfirmbooking',
  templateUrl: 'packageconfirmbooking.html',
  providers: [InAppBrowser],
})
export class PackageconfirmbookingPage {
  packageinfo;
  packagedetailList;
  packagetitleList;
  selectedpackagepriceinfo;
  packagetitleinfoList;
  bookdetails;
  packageuserDetails;
  packagepaymentList;
  locationinfoList;
  loading: Loading;
  createSuccess = false;
  amountToPay;
  mobileno; 
 email;
 name;
 payment=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, private loadingCtrl: LoadingController,public iab: InAppBrowser,private platform: Platform,private paymentview: PaymentpackageserviceProvider) {

    this.packageinfo = navParams.get('packageinfo');
    //this.packagedetailList = navParams.get('packagedetailList');
    this.packagetitleList = navParams.get('packagetitleList');
    this.selectedpackagepriceinfo = navParams.get('selectedpackagepriceinfo');
    //this.packagetitleinfoList = navParams.get('packagetitleinfoList');
    this.bookdetails = navParams.get('bookdetails');
    this.packageuserDetails = navParams.get('packageuserDetails');
    this.packagepaymentList = navParams.get('packagepaymentList');
    this.locationinfoList = navParams.get('locationinfoList');
    this.amountToPay = this.packagepaymentList.amountToPay;
    this.mobileno = this.packagepaymentList.mobileno;
    this.email = this.packagepaymentList.email;
    this.name = this.packagepaymentList.name;
    
    console.log(this.packagetitleList);
    console.log(this.selectedpackagepriceinfo);
    console.log(this.bookdetails);
    console.log(this.packagepaymentList);
    console.log(this.packageuserDetails);
    console.log(this.amountToPay);
    console.log(this.packagepaymentList);
    console.log(this.name);

    this.platform = platform;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     // StatusBar.styleDefault();
      //Splashscreen.hide();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PackageconfirmbookingPage');
  }
  public payudetails(){ 
    
      var self = this;
     
      
      var options = {
      /*  
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
     
      //order_id: 'order_7HtFNLS98dSj8x',
      currency: 'INR',
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: '5000',
      name: 'foo',
      external: {
        wallets: ['paytm']
      }, 
        prefill: {
          email: 'pranav@razorpay.com',
          contact: '8879524924',
          name: 'Pranav Gupta'
        }, */
        description: 'Credits towards consultation',
        image: 'https://i.imgur.com/3g7nmJC.png',
     
      //order_id: 'order_7HtFNLS98dSj8x',
      currency: 'INR',
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: self.amountToPay,
      name: self.email,
      external: {
        wallets: ['paytm']
      }, 
        prefill: {
          email: self.email,
          contact: self.mobileno,
          name: self.name
        },
        theme: {
          color: '#F37254'
        }
      }
      var successCallback = function(success) {
        
            
            
            //  alert('payment_id: ' + success.razorpay_payment_id)
             // this.nav.push(ListPage)
             //var landingUrl = "http://" + window.location.host + "/list.html";
             //window.location.href = landingUrl; 
             //self.navCtrl.setRoot(ListPage);
             console.log(success.razorpay_payment_id);
            
              var orderId = success.razorpay_order_id
              var signature = success.razorpay_signature
             // self.showLoading()
              var payment_id = success.razorpay_payment_id;
              console.log(success.razorpay_payment_id);
        
        
              self.paymentview.paymentcomplete(payment_id,self.packageuserDetails,self.packagepaymentList).subscribe(res => {
                let success = res['access'];
               if (success) {
                     
                  self.payment = res['payment'];
                        
                  console.log(self.payment);
                      setTimeout(() => {
                       self.loading.dismiss();
                   });
                   self.navCtrl.push(PackagepaymentmodePage,{payment_id,packagepaymentList: self.packagepaymentList,packageuserDetails: self.packageuserDetails})
               //self.navCtrl.push(PaysuccessPage,{payment_id,packagepaymentList: self.packagepaymentList,packageuserDetails: self.packageuserDetails})
                 
               //this.showPopup("Success", "Successfully Added");
               } else {
                
                self.navCtrl.push(HomePage,{payment_id,packagepaymentList: self.packagepaymentList,packageuserDetails: self.packageuserDetails})
               }
               },
               
               error => {
               setTimeout(() => {
                      self.loading.dismiss();
                   });
               self.showPopup("Error", error);
               });
            
              // self.navCtrl.push(HomePage,{payment_id,search:self.search,paymentList: self.paymentList,searchDetails: self.searchDetails,cityList: self.cityList,userDetails: self.userDetails})
        
            }
    
        var cancelCallback = function(error) {
          alert(error.description + ' (Error '+error.code+')')
        }
        RazorpayCheckout.on('payment.success', successCallback)
        RazorpayCheckout.on('payment.cancel', cancelCallback)
        RazorpayCheckout.open(options)
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
