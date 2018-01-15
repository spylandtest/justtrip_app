import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { api } from "../../app/global";

/*
  Generated class for the PaymentcompleteserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PaymentcompleteserviceProvider {

  constructor(public http: Http) {
    console.log('Hello PaymentcompleteserviceProvider Provider');
  }

  public paymentcomplete(payment_id,userDetails,paymentList) 
  {
    console.log('Hello cool shiva Provider');
    return Observable.create(observer => {
    // At this point store the credentials to your backend!
  //  let signUpUrl = api.signUpUrl;
  //  let signUpUrl = api.endPoint+api.signUpUrl;
  //let endPoint = '';
 // let endPoint = 'http://thecityshoppers.com/distribution';
  //let shopDetailUrl = '/api/insert.php';
  let paymentSubmitUrl = api.endPoint+api.paymentSubmitUrl;
      let headers = new Headers();
      let res = Array();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //     let data = "tripType="+searchvalues.tripType+"&leavingFrom="+searchvalues.leavingFrom+"&goingTo="+searchvalues.goingTo+"&date="+searchvalues.date+"&returnDate="+searchvalues.returnDate+"&numAdult="+searchvalues.numAdult+"&preferTime="+searchvalues.preferTime;
       //var data = JSON.stringify({username: credentials.email});
       let data ="payment_id="+payment_id+"&name="+userDetails.name+"&email="+userDetails.email+"&mobileno="+userDetails.mobileno+
       "&bookingId="+paymentList.bookingId+"&email="+paymentList.email+"&finalPrice="+paymentList.finalPrice+"&goingTo="+paymentList.goingTo+"&leavingFrom="+paymentList.leavingFrom;
       console.log(data);
    //  var self =  this ;
      this.http.post(paymentSubmitUrl,data,{headers: headers})
      .subscribe(data => {
      console.log('hello hello hi LAST STEP');
      console.log('hello hello hi LAST STEP');

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
    let payment = response.extras.payment;
    console.log('payment id update');
    console.log('shiva hi new TEST');
    console.log(payment);
    res['payment'] = payment;     
        
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
