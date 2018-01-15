import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CheckoutTripPage} from "../checkout-trip/checkout-trip";
import {PackageconfirmbookingPage} from "../packageconfirmbooking/packageconfirmbooking";




/**
 * Generated class for the ViewmorepackagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewmorepackage',
  templateUrl: 'viewmorepackage.html',
})
export class ViewmorepackagePage {
  packageinfo;
  packagedetailList;
  locationinfoList;
  packagetitleList;
  packagetitleinfoList;
  packagepricevalue;
  selectedpackagepriceinfo;

  startPoint;
  endPoint;
 //endPoint=[];
  endPoint2;
  packagetitlecontentsinfoList;
  bookdetails = {date: '',numAdult: '',preferTime: ''};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.packageinfo = navParams.get('packageinfo');
    this.packagedetailList = navParams.get('packagedetailList');
    this.packagetitleList = navParams.get('packagetitleList');
    this.locationinfoList = navParams.get('locationinfoList');
    this.packagetitleinfoList = navParams.get('packagetitleinfoList');
    this.packagetitlecontentsinfoList = navParams.get('packagetitlecontentsinfoList');
    this.packagepricevalue = this.packageinfo.price[0].price;
    this.selectedpackagepriceinfo=this.packageinfo.price[0];
    this.startPoint= this.packageinfo.startPoint;
    this.endPoint= this.packageinfo.endPoint;
    this.endPoint2= this.packageinfo.endPoint2;
    

    console.log(this.packageinfo.price[0]);
    console.log(this.packageinfo);
    console.log(this.startPoint);
    console.log(this.endPoint);
    console.log(this.endPoint2);
    
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewmorepackagePage');
    console.log(this.packagepricevalue);

  }

  public bookpackage(){
   // console.log(packageinfo);
   console.log(this.packagepricevalue);
   console.log(this.selectedpackagepriceinfo);
   console.log(this.bookdetails);
   
  this.navCtrl.push(CheckoutTripPage,{packageinfo:this.packageinfo,startPoint:this.startPoint,endPoint:this.endPoint,endPoint2:this.endPoint2,selectedpackagepriceinfo:this.selectedpackagepriceinfo,bookdetails:this.bookdetails,packagedetailList:this.packagedetailList,packagetitleList:this.packagetitleList,packagetitleinfoList:this.packagetitleinfoList,locationinfoList:this.locationinfoList});
  }

  public selectPrice(id,pricev,priceId) {
    console.log(pricev);
    this.selectedpackagepriceinfo = this.packageinfo.price[priceId]
    console.log(this.selectedpackagepriceinfo);
    this.packagepricevalue = pricev;
   // this.packageinfo[id].price[0]=pricev;
   
  }



}
