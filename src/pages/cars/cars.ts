import {Component} from "@angular/core";
//import {NavController} from "ionic-angular";
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import {CarService} from "../../providers/car-service";
import {CarDetailPage} from "../car-detail/car-detail";
import {UserdetailPage} from "../userdetail/userdetail";




@Component({
  selector: 'page-cars',
  templateUrl: 'cars.html'
})
export class CarsPage {
  // list of car shops
  searchList;
  searchDetails;
  cityList;
  loading: Loading;
  createSuccess = false;

  // number of days
  // public numDays = 3;

  constructor(public nav: NavController, public carService: CarService,public navParams: NavParams,private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    // set sample data
  //  this.shops = carService.getAll();
  this.searchList = navParams.get('searchList');
  this.searchDetails = navParams.get('searchDetails');
  this.cityList = navParams.get('cityList');

  }

  // view car
  /*viewDetail(classId) {
    this.nav.push(CarDetailPage, {id: classId});
    //this.navCtrl.push(UserdetailPage,{search,searchDetails: this.searchDetails,cityList:this.cityList});
  }*/
  public viewDetail(search) {
    console.log(this.searchDetails);
    console.log(this.cityList);
    this.nav.push(UserdetailPage,{search,searchDetails: this.searchDetails,cityList:this.cityList});
  //  this.navCtrl.push(SearchPage, {searchList: this.searchList,searchDetails: this.searchDetails});
//     this.nav.setRoot(ListTodayBooksPage,{shopId});
} 
}
