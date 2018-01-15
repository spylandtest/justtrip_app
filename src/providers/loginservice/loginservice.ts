import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { api } from "../../app/global";
import { User } from "../../app/user";
import { Storage } from '@ionic/storage';

/*
  Generated class for the LoginserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginserviceProvider {
  currentUser: User;
  constructor(public http: Http,public storage: Storage) {
    console.log('Hello LoginserviceProvider Provider');
  }
  
  public login(userId,password){

    console.log('hi login ');
    return Observable.create(observer => {
      
     
     // At this point store the credentials to your backend!
   //  let signUpUrl = api.signUpUrl;
     let customerLoginUrl = api.endPoint+api.customerLoginUrl;
       let headers = new Headers();
       let res = Array();
       headers.append('Content-Type', 'application/x-www-form-urlencoded');
       let data="username="+userId+"&password="+password;
   //   data={"username":"drivekooltest@gmail.com","password":"drivekool123"};
    //   headers.append('Content-Type', 'application/json'); 
   //    headers.append('Authorization', 'Bearer 68mdbxq3nf8yvn4lhnm12vt088407x99');
   //    let pageSize=5;
    //    let data = "?searchCriteria[pageSize]="+pageSize;
         //let data = "vendorId="+currentUser;
        //var data = JSON.stringify({username: credentials.email});
        //console.log(data);
     //  this.http.post(productsUrl,data,{headers: headers})
      // this.http.get(guestUserUrl,{headers: headers})
      this.http.post(customerLoginUrl,data,{headers: headers})
       .subscribe(data => {
       //console.log(JSON.stringify(data));
        console.log('hello listing succceess');
         let response = data.json();
         let access = response.success;

         if(response!='' || response!='undefined' || response!=null)
         {
         res['userId'] = response;
         let access = true;
         res['access'] = access;

         let id = response.extras.userProfileModel.id;
         let username = response.extras.userProfileModel.username;
         console.log(id);
         console.log(username);
        //  let mobile;
         //  let email;
           //let cartId;
        //   let userId=response;
         
         // let access = true;
           this.currentUser = new User(id,username);
           // console.log(name);
           this.storage.ready().then(() => {
            // set a key/value
            this.storage.set('currentUser',this.currentUser);            
          });
         }
         else{
          res['access'] = false;
         }
         console.log(response);
        
       //  let productList = response.items;
      //    let rtolist = response.extras.rtoOfficeList;
  
     // res['productList'] = productList;
         
    //     console.log(productList);
     //    res['services'] = list;
     //    res['rtoOffice'] = rtolist;
    //     let access = response.success;
       //console.log(JSON.stringify(response));
    //  console.log(JSON.stringify(access));
     //    res['access'] = access;
  //       res['message'] = false;
     //     observer.next(res);
    //      observer.complete();
  //  if (access==false)
   //        res['message'] =  response.extras.msg;
           observer.next(res);
           observer.complete();
       
       }, error => {
        let access = false;
         res['access'] = access;
         res['message'] = 'Oops! we had a problem.  Login into account';
          observer.next(res);
           observer.complete();
          
          // console.log(JSON.stringify(error.json()));
       });
   });
  
  }

}
