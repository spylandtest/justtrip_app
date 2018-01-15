import {Component} from "@angular/core";
import {NavController, LoadingController,Loading, ToastController,NavParams,AlertController} from "ionic-angular";
import {TripService} from "../../providers/trip-service";
import {HomePage} from "../home/home";
import {PackageconfirmbookingPage} from "../packageconfirmbooking/packageconfirmbooking";
import { PackagebookingserviceProvider } from '../../providers/packagebookingservice/packagebookingservice';


@Component({
  selector: 'page-checkout-trip',
  templateUrl: 'checkout-trip.html'
})
export class CheckoutTripPage {
  // trip data
  packageinfo;
  selectedpackagepriceinfo;
  bookdetails;
  packagedetailList;
  packagetitleList;
  packagetitleinfoList;
  locationinfoList;
  packagepaymentList=[];
  
  packageuserDetails = {name: '',email: '',mobileno: '',paymentmode: ''};

  loading: Loading;
  createSuccess = false;
  public trip: any;
  // number of adults
  public adults = 2;
   startPoint;
   endPoint;
   endPoint2;
  startPointId;
  endPoint2Id;
  // date
  public date = new Date();

  constructor(public nav: NavController, public navParams: NavParams,private alertCtrl: AlertController, public tripService: TripService, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private packagebookingsubmit: PackagebookingserviceProvider) {
    // set sample data
    this.trip = tripService.getItem(1);
    this.packageinfo = navParams.get('packageinfo');
    this.packagedetailList = navParams.get('packagedetailList');
    this.packagetitleList = navParams.get('packagetitleList');
    this.selectedpackagepriceinfo = navParams.get('selectedpackagepriceinfo');
    this.packagetitleinfoList = navParams.get('packagetitleinfoList');
    this.locationinfoList = navParams.get('locationinfoList');
    this.bookdetails = navParams.get('bookdetails');
    this.startPoint = navParams.get('startPoint');
    this.endPoint = navParams.get('endPoint');
    this.endPoint2 = navParams.get('endPoint2');
    this.startPointId = this.startPoint[0].id;
    this.endPoint2Id = this.endPoint2[0].id;
    console.log(this.packagetitleList);
    console.log(this.selectedpackagepriceinfo);
    console.log(this.bookdetails);
    
    console.log(this.startPointId);
    console.log(this.endPoint2Id);
     
   // this.packagetitlecontentsinfoList = navParams.get('packagetitlecontentsinfoList');
  }

  // process send button
  send() {
    // send booking info
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    // show message
    let toast = this.toastCtrl.create({
      showCloseButton: true,
      cssClass: 'profile-bg',
      message: 'Book Activity Success!',
      duration: 3000,
      position: 'bottom'
    });

    loader.present();

    setTimeout(() => {
      loader.dismiss();
      toast.present();
      // back to home page
      this.nav.setRoot(HomePage);
    }, 3000)
  }
  confirmbooking(){

    this.nav.push(PackageconfirmbookingPage,{packageuserDetails:this.packageuserDetails,packageinfo:this.packageinfo,selectedpackagepriceinfo:this.selectedpackagepriceinfo,bookdetails:this.bookdetails,packagedetailList:this.packagedetailList,packagetitleList:this.packagetitleList,packagetitleinfoList:this.packagetitleinfoList});
  }


  public packagebookingView(packageinfo) {
    
        console.log(this.packageinfo);
       // console.log(this.locationinfoList);
        console.log(this.packagetitleList);
        console.log(this.bookdetails);
        console.log(this.selectedpackagepriceinfo);
    
        this.showLoading()
        this.packagebookingsubmit.packagebookingView(this.packageuserDetails,this.startPointId,this.endPoint2Id,this.packageinfo,this.bookdetails,this.selectedpackagepriceinfo).subscribe(res => {
        let success = res['access'];
            
        if (success) {
        
          this.packagepaymentList = res['packagepaymentList'];
              this.createSuccess = true;
              setTimeout(() => {
              this.loading.dismiss();
           });
           
           console.log(this.packagepaymentList);
           console.log('HELLO PAYMENT LIST');

           this.nav.push(PackageconfirmbookingPage,{packageuserDetails:this.packageuserDetails, packagepaymentList:this.packagepaymentList,packageinfo,locationinfoList: this.locationinfoList,packagetitleList: this.packagetitleList,bookdetails: this.bookdetails,selectedpackagepriceinfo: this.selectedpackagepriceinfo});
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
       this.nav.popToRoot();
     }
   }
 }
]
});
alert.present();
}


}
