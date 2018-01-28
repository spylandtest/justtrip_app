import {Component} from "@angular/core";
//import {NavController} from "ionic-angular";
import {TripService} from "../../providers/trip-service";
import {CheckoutTripPage} from "../checkout-trip/checkout-trip";
import {ViewmorepackagePage} from "../viewmorepackage/viewmorepackage";
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { PackagedetailserviceProvider } from '../../providers/packagedetailservice/packagedetailservice';
@Component({
  selector: 'page-trip-detail',
  templateUrl: 'trip-detail.html'
})
export class TripDetailPage {
  // trip info
  packagedetailList=[];
  packagetitleList=[];
  packagesvalueinfoList=[];
  locationinfoList=[];
  packagetitleinfoList=[];
  packagetitlecontentsinfoList=[];
  //startpoint=[];

  packagetitle;
  loading: Loading;
  createSuccess = false;
  
  public trip: any;
  // number of adult
  public adults = 2;
  // number of children
  public children = 0;

  constructor(public nav: NavController, public tripService: TripService,public navParams: NavParams,private alertCtrl: AlertController,  private loadingCtrl: LoadingController, private packageservice: PackagedetailserviceProvider) {
    // set sample data
    this.trip = tripService.getItem(1);
    this.packagetitle = navParams.get('packagetitle');
    console.log(this.packagetitle);
    console.log(this.packagetitle.locationUrl);
    console.log(this.packagetitleinfoList);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Carrent page');
    this.packagedetails(this.packagetitle);
  }

  // minus adult when click minus button
  minusAdult() {
    this.adults--;
  }

  // plus adult when click plus button
  plusAdult() {
    this.adults++;
  }

  // minus children when click minus button
  minusChildren() {
    this.children--;
  }

  // plus children when click plus button
  plusChildren() {
    this.children++;
  }

  // go to checkout page
  checkout() {
    this.nav.push(CheckoutTripPage);
  }

  dobookingnow(packageinfo){
    console.log(packageinfo);
    
     this.nav.push(ViewmorepackagePage,{packageinfo,packagedetailList:this.packagedetailList,packagetitleList:this.packagetitleList,locationinfoList:this.locationinfoList,packagetitleinfoList:this.packagetitleinfoList,packagetitlecontentsinfoList:this.packagetitlecontentsinfoList });
  }

  public selectPrice(id,price,priceId) {
    //let priceId=1;
    console.log(price);
    console.log(priceId);
    console.log('select price Test');
  //  this.packagesvalueinfoList[id-1].price[0].price=this.packagesvalueinfoList[id-1].price[priceId];
    this.packagesvalueinfoList[id-1].price[priceId].price=this.packagesvalueinfoList[id-1].price[0].price;
   this.packagesvalueinfoList[id-1].price[0].price=price;
    console.log(this.packagesvalueinfoList[id].price[0]);
    console.log(this.packagesvalueinfoList);
  }

  public packagedetails(packagetitle) {
    this.showLoading()
  this.packageservice.packagedetails(this.packagetitle).subscribe(res => {
  let success = res['access'];
  
  
  if (success) {
  
    this.packagedetailList = res['packagedetailList'];
    this.packagetitleList = res['packagetitleList'];
    this.packagesvalueinfoList =  res['packagesvalueinfoList'];
    this.locationinfoList = res['locationinfoList'];
    this.packagetitleinfoList = res['packagetitleinfoList'] ;
 
   this.packagetitlecontentsinfoList = res['packagetitlecontentsinfoList'];

        this.createSuccess = true;
        setTimeout(() => {
        this.loading.dismiss();
     });
     console.log(this.packagetitleList);
     console.log(this.packagesvalueinfoList);
    // console.log(this.searchDetails);
  
  
//this.nav.push(CarsPage, {searchList: this.searchList,searchDetails: this.searchDetails,cityList:this.cityList});
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
