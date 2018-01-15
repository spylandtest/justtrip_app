import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { api } from "../../app/global";

/*
  Generated class for the BookingsubmittserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingsubmittserviceProvider {

  constructor(public http: Http) {
    console.log('Hello BookingsubmittserviceProvider Provider');
  }

  public bookingView(search,searchDetails,cityList,userDetails) 
  {
    return Observable.create(observer => {
    // At this point store the credentials to your backend!
  //  let signUpUrl = api.signUpUrl;
  //  let signUpUrl = api.endPoint+api.signUpUrl;
  //let endPoint = '';
 // let endPoint = 'http://thecityshoppers.com/distribution';
  //let shopDetailUrl = '/api/insert.php';
  let bookingSubmitUrl = api.endPoint+api.bookingSubmitUrl;
      let headers = new Headers();
      let res = Array();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //     let data = "tripType="+searchvalues.tripType+"&leavingFrom="+searchvalues.leavingFrom+"&goingTo="+searchvalues.goingTo+"&date="+searchvalues.date+"&returnDate="+searchvalues.returnDate+"&numAdult="+searchvalues.numAdult+"&preferTime="+searchvalues.preferTime;
       //var data = JSON.stringify({username: credentials.email});
       let data ="id="+search.id+"&imgPath="+search.imgPath+"&model="+search.model+"&capcity="+search.capcity+"&vPrice="+search.vPrice+"&extraPrice="+search.extraPrice+"&mileage="+search.mileage+"&price="+search.price+"&returnPrice="+search.returnPrice+"&multiPrice="+search.multiPrice+"&lFrom="+search.lFrom+"&to="+search.to+"&needExtraPrice="+search.needExtraPrice
       +"&tripType="+searchDetails.tripType+"&leavingFrom="+searchDetails.leavingFrom+"&goingTo="+searchDetails.goingTo+"&date="+searchDetails.date+"&returnDate="+searchDetails.returnDate+"&numAdult="+searchDetails.numAdult+"&preferTime="+searchDetails.preferTime
       +"&name="+userDetails.name+"&email="+userDetails.email+"&mobileno="+userDetails.mobileno;

       console.log(data);
      this.http.post(bookingSubmitUrl,data,{headers: headers})
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
    let paymentList = response.extras.paymentList;
    console.log('hello hello hi');
    console.log('shiva hi new');
     console.log(paymentList);
    res['paymentList'] = paymentList;     
        
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
