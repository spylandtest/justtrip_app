import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.search = navParams.get('search');
    this.bikesearchList = navParams.get('bikesearchList');
    this.locationinfoList = navParams.get('locationinfoList');
    this.searchbikevalues = navParams.get('searchbikevalues');
    this.leftdays = navParams.get('leftdays');
    this.hours = navParams.get('hours');
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BikedetailsPage');
  }
  
  public bikeuseretails() {

  }

}
