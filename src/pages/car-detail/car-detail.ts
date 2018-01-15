import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {CarService} from "../../providers/car-service";
import {CheckoutCarPage} from "../checkout-car/checkout-car";


@Component({
  selector: 'page-car-detail',
  templateUrl: 'car-detail.html'
})
export class CarDetailPage {
  // car shop information
  public shop: any;

  // number of days
  public numDays = 3;

  constructor(public nav: NavController, public carService: CarService) {
    // set sample data
    this.shop = carService.getItem(1);
  }

  // go to checkout page
  checkout() {
    this.nav.push(CheckoutCarPage);
  }
}
