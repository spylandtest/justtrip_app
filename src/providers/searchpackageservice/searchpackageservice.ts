import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { api } from "../../app/global";


/*
  Generated class for the SearchpackageserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchpackageserviceProvider {

  constructor(public http: Http) {
    console.log('Hello SearchpackageserviceProvider Provider');
  }

  public searchpackagedetails()
  {
    return Observable.create(observer => {
    // At this point store the credentials to your backend!
  //  let signUpUrl = api.signUpUrl;
  //  let signUpUrl = api.endPoint+api.signUpUrl;
  //let endPoint = '';
 // let endPoint = 'http://thecityshoppers.com/distribution';
  //let shopDetailUrl = '/api/insert.php';
  let searchPackagesUrl = api.endPoint+api.searchPackagesUrl;
      let headers = new Headers();
      let res = Array();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
     
      let data = "";
       //var data = JSON.stringify({username: credentials.email});
      

       console.log(data);
      this.http.post(searchPackagesUrl,data,{headers: headers})
      .subscribe(data => {
        //console.log('hello hello hi');
        let response = data.json();
                
        let access = response.success;
        
     //    console.log(JSON.stringify(access.json()));
     console.log(JSON.stringify(access));
        res['access'] = access;
        res['message'] = false;
        
    //     observer.next(res);
   //      observer.complete();

   if(access==true)
   {
    let packagetitleList = response.extras.packagetitleList;
     console.log('shiva\ packages');
     console.log(packagetitleList);
    res['packagetitleList'] = packagetitleList;     
        
   }

   if (access==false)
          res['message'] =  response.message;
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

