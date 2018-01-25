import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BikeuserdetailsPage} from "../bikeuserdetails/bikeuserdetails";

/**
 * Generated class for the BikedetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bikedetails',
  templateUrl: 'bikedetails.html',
})
export class BikedetailsPage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.search = navParams.get('search');
    this.bikesearchList = navParams.get('bikesearchList');
    this.locationinfoList = navParams.get('locationinfoList');
    this.searchbikevalues = navParams.get('searchbikevalues');
    this.leftdays = navParams.get('leftdays');
    this.hours = navParams.get('hours');
    this.dateIntval = navParams.get('dateIntval');
    this.timeIntval = navParams.get('timeIntval');
    this.finalbikeprice = (this.search.dayrent*this.dateIntval)+(this.search.statingPrice*this.timeIntval);
    console.log(this.finalbikeprice);
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BikedetailsPage');
  }
  
  public bikeuseretails() {
    console.log(this.search);
    console.log(this.bikesearchList);
    console.log(this.searchbikevalues);
    
    this.navCtrl.push(BikeuserdetailsPage,{search:this.search,bikesearchList: this.bikesearchList,searchbikevalues:this.searchbikevalues,locationinfoList:this.locationinfoList,hours:this.hours,leftdays:this.leftdays,dateIntval:this.dateIntval,timeIntval:this.timeIntval,finalbikeprice:this.finalbikeprice});
  }

}
