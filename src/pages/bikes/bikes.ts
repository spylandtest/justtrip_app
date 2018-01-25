import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BikedetailsPage} from "../bikedetails/bikedetails";

/**
 * Generated class for the BikesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bikes',
  templateUrl: 'bikes.html',
})
export class BikesPage {
  bikesearchList;
  locationinfoList;
  searchbikevalues;
  leftdays;
  hours;
  pickupdate;
  dropdate;
  dateIntval;
  timeIntval;
  
   
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.bikesearchList = navParams.get('bikesearchList');
    this.locationinfoList = navParams.get('locationinfoList');
    this.searchbikevalues = navParams.get('searchbikevalues');
    //this.pickupdate =this.searchbikevalues.pickupdate;
    this.pickupdate =this.searchbikevalues.pickupdate;
    this.dropdate =this.searchbikevalues.dropdate;
    
    
    console.log(this.pickupdate);
    
    console.log(this.dropdate);
  //  this.leftdays = this.pickupdate -  this.dropdate;
 // this.leftdays = 2;
  this.hours = 5;
  this.dateIntval = 1;
  this.timeIntval = 11;
 

  if(this.timeIntval>5){
    this.hours = this.timeIntval;
  }
  if(this.timeIntval>10){
    this.dateIntval = this.dateIntval+1;
  }

    console.log(this.leftdays);
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad BikesPage');
  }

  public bikeviewDetail(search) {
    console.log(this.bikesearchList);
    console.log(this.searchbikevalues);
    this.navCtrl.push(BikedetailsPage,{search,bikesearchList: this.bikesearchList,searchbikevalues:this.searchbikevalues,locationinfoList:this.locationinfoList,hours:this.hours,leftdays:this.leftdays,dateIntval:this.dateIntval,timeIntval:this.timeIntval});
  //  this.navCtrl.push(SearchPage, {searchList: this.searchList,searchDetails: this.searchDetails});
//     this.nav.setRoot(ListTodayBooksPage,{shopId});
}
}
