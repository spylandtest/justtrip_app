import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { api } from "../../app/global";

/*
  Generated class for the BikebookingserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BikebookingserviceProvider {

  constructor(public http: Http) {
    console.log('Hello BikebookingserviceProvider Provider');
  }

  public bikebookingView(search,searchbikevalues,finalbikeprice,bikeuserDetails,leftdays,hours,bikesearchList) 
  {
    return Observable.create(observer => {
    // At this point store the credentials to your backend!
  //  let signUpUrl = api.signUpUrl;
  //  let signUpUrl = api.endPoint+api.signUpUrl;
  //let endPoint = '';
 // let endPoint = 'http://thecityshoppers.com/distribution';
  //let shopDetailUrl = '/api/insert.php';
  let bikebookingSubmitUrl = api.endPoint+api.bikebookingSubmitUrl;
      let headers = new Headers();
      let res = Array();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
  
  
       let data ="id="+search.id+"&imgPath="+search.imgPath+"&title="+search.title+"&location="+search.location+"&locationId="+search.locationId+"&locationUrl="+search.locationUrl+"&statingPrice="+search.statingPrice+"&dayrent="+search.dayrent
       +"&dropdate="+searchbikevalues.dropdate+"&location="+searchbikevalues.location+"&pickupdate="+searchbikevalues.pickupdate+"&finalbikeprice="+finalbikeprice+"&leftdays="+leftdays+"&hours="+hours
       +"&name="+bikeuserDetails.name+"&email="+bikeuserDetails.email+"&mobileno="+bikeuserDetails.mobileno+"&paymentmode="+bikeuserDetails.paymentmode;

       console.log(data);
      this.http.post(bikebookingSubmitUrl,data,{headers: headers})
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
    let bikepaymentList = response.extras.bikepaymentList;
    console.log('hello hello hi');
    console.log('shiva hi bike  new');
     console.log(bikepaymentList);
    res['bikepaymentList'] = bikepaymentList;     
        
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
