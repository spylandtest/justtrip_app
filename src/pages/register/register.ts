import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder,} from '@angular/forms';
import {NavController,AlertController, Loading, LoadingController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";

import { AuthserviceProvider } from '../../providers/authservice/authservice';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;
  registerCredentials = {name: '', username: '', password: '',confirmpassword: ''};
  loading: Loading;
  createSuccess = false;


  constructor(private _fb: FormBuilder, private nav: NavController, private auth: AuthserviceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  ngOnInit() {
    this.onRegisterForm = this._fb.group({
      name: ['', Validators.compose([
        Validators.required
      ])],      
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      confirmpassword: ['', Validators.compose([
        Validators.required
      ])]
    });

    
  }  

  // register and go to home page
  register() {
    //this.nav.setRoot(HomePage);
    this.showLoading()
    this.auth.register(this.registerCredentials).subscribe(res => {
       let success = res['access'];
      if (success) {
             this.createSuccess = true;
             setTimeout(() => {
             this.loading.dismiss();
          });
          this.showPopup("Success", "Successfully Registered");
          
            this.nav.setRoot(LoginPage);
          

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


  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}
