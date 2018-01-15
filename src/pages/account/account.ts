import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {LoginPage} from "../login/login";


@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public nav: NavController) {
  }

  // logout
  logout() {
    this.nav.setRoot(LoginPage);
  }
}
