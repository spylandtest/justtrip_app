import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
// import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { NavController, AlertController, Loading, LoadingController,NavParams,IonicPage, ToastController, MenuController } from 'ionic-angular';
import { LoginserviceProvider } from '../../providers/loginservice/loginservice';

import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  loading: Loading;
  createSuccess = false;
  userId;
  password;

  constructor(private _fb: FormBuilder, public nav: NavController, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController, private Loginuser: LoginserviceProvider,private loadingCtrl: LoadingController ) {
    this.menu.swipeEnable(false);
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])]
    });
  }  

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  loginold() {
    this.nav.setRoot(HomePage);
  }

  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }


  
public login() {

  this.showLoading()
  console.log(this.userId);
  console.log(this.password);
this.Loginuser.login(this.userId,this.password).subscribe(res => {
let success = res['access'];
if (success) {
      this.createSuccess = true;
      setTimeout(() => {
      this.loading.dismiss();
   });
 //  this.showPopup("Success", "Successfully Registered");
   this.nav.setRoot(HomePage);
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
let alert = this.forgotCtrl.create({
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
