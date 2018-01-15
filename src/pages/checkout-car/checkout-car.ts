import {Component} from "@angular/core";
//import {NavController, LoadingController, ToastController} from "ionic-angular";
import { NavController, AlertController, Loading, LoadingController,NavParams,IonicPage } from 'ionic-angular';
import {CarService} from "../../providers/car-service";
import {HomePage} from "../home/home";
import { InAppBrowser, InAppBrowserObject, InAppBrowserOptions, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { File } from '@ionic-native/file';
import { PaysuccessPage } from "../paysuccess/paysuccess";
import { Platform } from 'ionic-angular';
//import { StatusBar, Splashscreen } from 'ionic-native';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PaymentcompleteserviceProvider } from '../../providers/paymentcompleteservice/paymentcompleteservice';
declare var cordova: any;
//declare var RazorpayCheckout: any;
declare var RazorpayCheckout: any;



@Component({
  selector: 'page-checkout-car',
  templateUrl: 'checkout-car.html',
providers: [InAppBrowser],

})
export class CheckoutCarPage {
 
  url;
  finalPrice; mobileno; email; name;
  search;
  searchDetails;
  cityList;
  userDetails;
  paymentList;
  loading: Loading;
  createSuccess = false;
  inAppBrowserRef;
  payment=[];

  // car shop information
 // public shop: any;
  // car info
  //public car: any;
  // date from
  //public dateFrom = new Date();
  // date to
  //public dateTo = new Date();
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController, private loadingCtrl: LoadingController,public iab: InAppBrowser,private paymentview: PaymentcompleteserviceProvider,private platform: Platform) {
    // set sample data
    this.platform = platform;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     // StatusBar.styleDefault();
      //Splashscreen.hide();
    });


    this.search = navParams.get('search');
    this.searchDetails = navParams.get('searchDetails');
    var searchDetails = JSON.stringify(searchDetails); 
    this.cityList = navParams.get('cityList');
    this.userDetails = navParams.get('userDetails');
    var userDetails = JSON.stringify(userDetails); 
    this.paymentList = navParams.get('paymentList');
    this.url = this.paymentList.url;
    this.finalPrice = this.paymentList.finalPrice;
    this.mobileno = this.paymentList.mobileno;
    this.email = this.paymentList.email;
    this.name = this.paymentList.name;

  //  var inAppBrowserRef;
   // this.shop = carService.getItem(1);
    //this.car = this.shop.cars[0];
   // RazorpayCheckout.on('payment.success', this.successCallback)
   // RazorpayCheckout.on('payment.cancel', this.cancelCallback)
    
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
  amount: self.finalPrice,
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


      self.paymentview.paymentcomplete(payment_id,self.userDetails,self.paymentList).subscribe(res => {
        let success = res['access'];
       if (success) {
             
          self.payment = res['payment'];
                
          console.log(self.payment);
              setTimeout(() => {
               self.loading.dismiss();
           });
           self.navCtrl.push(PaysuccessPage,{payment_id,search:self.search,paymentList: self.paymentList,searchDetails: self.searchDetails,cityList: self.cityList,userDetails: self.userDetails})
         //this.showPopup("Success", "Successfully Added");
       } else {
         
        self.navCtrl.push(HomePage,{payment_id,search:self.search,paymentList: self.paymentList,searchDetails: self.searchDetails,cityList: self.cityList,userDetails: self.userDetails})
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
  /*
  payudetails(){
    this.iab.open(this.url, ‘_self’, ‘location=yes’);
    }*/
/* public payudetails() {
    
    // window.open(this.url, '_self', 'location=no');
     const browser = this.iab.create(this.url,'_self',{location:'no'}); 
    
    }*/
    
   /* 
    public payudetails(url) {
      
      
     console.log(options);

     

     var successCallback = function(success) {
      alert('payment_id: ' + success.razorpay_payment_id)
   //   var orderId = success.razorpay_order_id
      var signature = success.razorpay_signature
    }
    
    var cancelCallback = function(error) {
      alert(error.description + ' (Error '+error.code+')')
    }
    
    RazorpayCheckout.on('payment.success', successCallback)
    RazorpayCheckout.on('payment.cancel', cancelCallback)
    RazorpayCheckout.open(options)

}*/
    
      
 /*     public loadStartCallBack() {
        alert('Loading close: ' + this.url);
       // sessionStorage.setItem( 'redURL',this.url);
      
         // $('#status-message').text("loading please wait ...");
      
      } */
    
/*
    public payudetails()
    {
      var ref = cordova.InAppBrowser.open(this.url, '_self', 'location=yes');
    } */

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

  // process send button
  /* send() {
    // send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    }); */
    // show message
 /*   let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profile-bg',
      message: 'Car Rent Success!',
      duration: 3000,
      position: 'bottom'
    });*/
/*
    loader.present();

    setTimeout(() => {
      loader.dismiss();
      //toast.present();
      // back to home page
      this.nav.setRoot(HomePage);
    }, 3000)
  }*/


}
