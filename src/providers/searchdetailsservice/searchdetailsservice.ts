import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { api } from "../../app/global";

/*
  Generated class for the SearchdetailsserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchdetailsserviceProvider {

  constructor(public http: Http) {
    console.log('Hello SearchdetailsserviceProvider Provider');
  }


  public searchdetails(searchvalues) 
  {
    return Observable.create(observer => {
    // At this point store the credentials to your backend!
  //  let signUpUrl = api.signUpUrl;
  //  let signUpUrl = api.endPoint+api.signUpUrl;
  //let endPoint = '';
 // let endPoint = 'http://thecityshoppers.com/distribution';
  //let shopDetailUrl = '/api/insert.php';
  let searchDetailsUrl = api.endPoint+api.searchDetailsUrl;
      let headers = new Headers();
      let res = Array();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
     
      let data = "tripType="+searchvalues.tripType+"&leavingFrom="+searchvalues.leavingFrom+"&goingTo="+searchvalues.goingTo+"&date="+searchvalues.date+"&returnDate="+searchvalues.returnDate+"&numAdult="+searchvalues.numAdult+"&preferTime="+searchvalues.preferTime;
       //var data = JSON.stringify({username: credentials.email});
      

       console.log(data);
      this.http.post(searchDetailsUrl,data,{headers: headers})
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
    let searchList = response.extras.searchList;
    console.log('hello hello hi');
    console.log('shiva hi');
     console.log(searchList);
    res['searchList'] = searchList;     
        
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
