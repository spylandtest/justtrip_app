import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { api } from "../../app/global";

/*
  Generated class for the AuthserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthserviceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthserviceProvider Provider');
  }

  public register(registerCredentials) {
    {
      if (registerCredentials.email === null || registerCredentials.password === null) {
        return Observable.throw("Please insert credentials");
      } else if (registerCredentials.password != registerCredentials.confirmpassword) {
        return Observable.throw("Password didn't match with Confirm Password");
      } else {
      return Observable.create(observer => {
      // At this point store the credentials to your backend!
    //  let signUpUrl = api.signUpUrl;
    //  let signUpUrl = api.endPoint+api.signUpUrl;
   // let endPoint = '';
  //  let endPoint = 'http://thecityshoppers.com/distribution';
    //let shopDetailUrl = '/api/insert.php';
    let signUpUrl = api.endPoint+api.signUpUrl;
        let headers = new Headers();
        let res = Array();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
         let data = "name="+registerCredentials.name+"&username="+registerCredentials.username+"&password="+registerCredentials.password;
         //var data = JSON.stringify({username: credentials.email});
         console.log(data);
        this.http.post(signUpUrl,data,{headers: headers})
        .subscribe(data => {
        
          let response = data.json();
          let access = response.success;
        //  let id = response.userProfileModel.id;
          //let email = response.userProfileModel.email;
         // let email = userdetails.email;
         // let name = userdetails.name;
         // console.log(id);
          //console.log(email);
       //    console.log(JSON.stringify(access.json()));
       console.log(JSON.stringify(access));
          res['access'] = access;
          res['message'] = false;
      //     observer.next(res);
     //      observer.complete();
     if (access==false)
            res['message'] =  response.extras.msg;
            observer.next(res);
            observer.complete();
        
        }, error => {
         let access = false;
          res['access'] = access;
          res['message'] = 'Oops! we had a problem.  Please try again in a few minutes';
           observer.next(res);
            observer.complete();
           
           // console.log(JSON.stringify(error.json()));
        });
    });
    }
  }
  }

}
