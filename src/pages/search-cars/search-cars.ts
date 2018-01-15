import {Component} from "@angular/core";
//import {NavController} from "ionic-angular";
import { NavController, AlertController, Loading, LoadingController,NavParams,IonicPage } from 'ionic-angular';
import {CarsPage} from "../cars/cars";
import {SearchLocationPage} from "../search-location/search-location";
import { LocationserviceProvider } from '../../providers/locationservice/locationservice';
import { SearchdetailsserviceProvider } from '../../providers/searchdetailsservice/searchdetailsservice';
@Component({
  selector: 'page-search-cars',
  templateUrl: 'search-cars.html'
})
export class SearchCarsPage {
  loading: Loading;
  createSuccess = false;
  cataloglist= [];
  cityList=[];
  searchList=[];
  searchDetails = {tripType: '',leavingFrom: '',goingTo: '', date: '', returnDate: '', numAdult: '',preferTime: ''};
  // search condition
 /* public search = {
    pickup: "Rio de Janeiro - Brazil",
    dropOff: "Same as pickup",
    from: new Date().toISOString(),
    to: new Date().toISOString(),
  }; */

  constructor(public nav: NavController,public navParams: NavParams, private alertCtrl: AlertController, private location: LocationserviceProvider, private searchservice: SearchdetailsserviceProvider, private loadingCtrl: LoadingController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Carrent page');
    this.getLocationDetail();
  }
public getLocationDetail() {
    this.showLoading()
this.location.getLocationDetail().subscribe(res => {
 let success = res['access'];
if (success) {
      // this.cataloglist = res['catalogList'];
         this.cityList = res['cityList'];
         
         
   console.log(this.cityList);
       setTimeout(() => {
        this.loading.dismiss();
    });
  //this.showPopup("Success", "Successfully Added");
} else {
  setTimeout(() => {
    this.loading.dismiss();
});
}
},
error => {
setTimeout(() => {
       this.loading.dismiss();
    });
this.showPopup("Error", error);
});
}

  // choose place
  choosePlace() {
    this.nav.push(SearchLocationPage);
  }

  // go to result page
  doSearch() {
    this.nav.push(CarsPage);
  }

//search
public searchdetails() {
  this.showLoading()
this.searchservice.searchdetails(this.searchDetails).subscribe(res => {
let success = res['access'];


if (success) {

  this.searchList = res['searchList'];
      this.createSuccess = true;
      setTimeout(() => {
      this.loading.dismiss();
   });
   console.log(this.searchList);
   console.log(this.searchDetails);


   this.nav.push(CarsPage, {searchList: this.searchList,searchDetails: this.searchDetails,cityList:this.cityList});
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
