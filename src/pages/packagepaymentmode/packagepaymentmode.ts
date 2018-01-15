import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
/**
 * Generated class for the PackagepaymentmodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-packagepaymentmode',
  templateUrl: 'packagepaymentmode.html',
})
export class PackagepaymentmodePage {
  payment_id;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    this.payment_id =navParams.get('payment_id');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PackagepaymentmodePage');
  }

  backtohome() {
    this.navCtrl.push(HomePage);
  }
}
