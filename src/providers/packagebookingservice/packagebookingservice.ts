import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { api } from "../../app/global";

/*
  Generated class for the PackagebookingserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PackagebookingserviceProvider {

  constructor(public http: Http) {
    console.log('Hello PackagebookingserviceProvider Provider');
  }

  public packagebookingView(packageuserDetails,startPointId,endPoint2Id,packageinfo,bookdetails,selectedpackagepriceinfo) 
 
  {
    return Observable.create(observer => {
    // At this point store the credentials to your backend!
  //  let signUpUrl = api.signUpUrl;
  //  let signUpUrl = api.endPoint+api.signUpUrl;
  //let endPoint = '';
 // let endPoint = 'http://thecityshoppers.com/distribution';
  //let shopDetailUrl = '/api/insert.php';
  let packagebookingSubmitUrl = api.endPoint+api.packagebookingSubmitUrl;
      let headers = new Headers();
      let res = Array();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //     let data = "tripType="+searchvalues.tripType+"&leavingFrom="+searchvalues.leavingFrom+"&goingTo="+searchvalues.goingTo+"&date="+searchvalues.date+"&returnDate="+searchvalues.returnDate+"&numAdult="+searchvalues.numAdult+"&preferTime="+searchvalues.preferTime;
       var packageprice = JSON.stringify({packageprice: packageinfo.price});
       var startPoint = JSON.stringify({startPoint: packageinfo.startPoint});
       var endPoint = JSON.stringify({endPoint: packageinfo.endPoint});
       var endPoint2 = JSON.stringify({endPoint2: packageinfo.endPoint2});
       console.log(packageprice);

       let data ="date="+bookdetails.date+"&numAdult="+bookdetails.numAdult+"&preferTime="+bookdetails.preferTime
       +"&selectedpackageid="+selectedpackagepriceinfo.selectedpackageid+"&selectedpackageidname="+selectedpackagepriceinfo.selectedpackageidname
             +"&vehicleId="+selectedpackagepriceinfo.vehicleId+"&price="+selectedpackagepriceinfo.price+"&active="+selectedpackagepriceinfo.active
             +"&name="+packageuserDetails.name+"&email="+packageuserDetails.email+"&mobileno="+packageuserDetails.mobileno+"&paymentmode="+packageuserDetails.paymentmode+"&startPointId="+startPointId+"&endPoint2Id="+endPoint2Id
             +"&active="+packageinfo.active+"&category="+packageinfo.category+"&code="+packageinfo.code+"&endPoint="+endPoint+"&endPoint2="+endPoint2+"&id="+packageinfo.id+"&imgPath="+packageinfo.imgPath
             +"&metaDescription="+packageinfo.metaDescription+"&metaKeywords="+packageinfo.metaKeywords+"&metaTitle="+packageinfo.metaTitle+"&packagename="+packageinfo.name+"&overview="+packageinfo.overview
             +"&packageUrl="+packageinfo.packageUrl+"&packageprice="+packageprice+"&startPoint="+startPoint+"&title="+packageinfo.title+"&type="+packageinfo.type;

       console.log(data);
      this.http.post(packagebookingSubmitUrl,data,{headers: headers})
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
    let packagepaymentList = response.extras.packagepaymentList;
    console.log('hello package book ');
    console.log('shiva hi package booking ');
     console.log(packagepaymentList);
    res['packagepaymentList'] = packagepaymentList;     
        
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
