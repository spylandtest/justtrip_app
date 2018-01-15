import {Component} from "@angular/core";
//import {NavController} from "ionic-angular";
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import {TripService} from "../../providers/trip-service";
import {TripDetailPage} from "../trip-detail/trip-detail";
import { PackagedetailserviceProvider } from '../../providers/packagedetailservice/packagedetailservice';
@Component({
  selector: 'page-trips',
  templateUrl: 'trips.html'
})
export class TripsPage {
  // list of trips
  packagedetailList=[];
  loading: Loading;
  createSuccess = false;
  packagetitle;
  public trips: any;
  packagetitleList;
  constructor(public nav: NavController, public tripService: TripService,public navParams: NavParams,private alertCtrl: AlertController, private loadingCtrl: LoadingController, private packageservice: PackagedetailserviceProvider) {
    // set sample data
    this.trips = tripService.getAll();
    this.packagetitleList = navParams.get('packagetitleList');
  }

  // view trip detail
  viewDetail(packagetitle) {
    this.nav.push(TripDetailPage, {packagetitle});
  }
  

 

}
