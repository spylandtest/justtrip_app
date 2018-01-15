import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import { api } from "../../app/global";

/*
  Generated class for the PackagedetailserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PackagedetailserviceProvider {

  constructor(public http: Http) {
    console.log('Hello PackagedetailserviceProvider Provider');
  }


  public packagedetails(packagetitle)
  {
    return Observable.create(observer => {
    // At this point store the credentials to your backend!
  //  let signUpUrl = api.signUpUrl;
  //  let signUpUrl = api.endPoint+api.signUpUrl;
  //let endPoint = '';
 // let endPoint = 'http://thecityshoppers.com/distribution';
  //let shopDetailUrl = '/api/insert.php';
  let PackagedetailsUrl = api.endPoint+api.PackagedetailsUrl;
      let headers = new Headers();
      let res = Array();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
     
      let data = "locationUrl="+packagetitle.locationUrl+"&locationId="+packagetitle.locationId+"&title="+packagetitle.title+"&statingPrice="+packagetitle.statingPrice;
       //var data = JSON.stringify({username: credentials.email});
      

       console.log(data);
      this.http.post(PackagedetailsUrl,data,{headers: headers})
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
    let packagesvalueinfoList = response.extras.packagesvalueinfoList;
    //let startpoint = response.extras.packagesvalueinfoList.startPoint;
    let locationinfoList = response.extras.locationinfoList;
    let packagetitleinfoList = response.extras.packagetitleinfoList;
    let packagetitlecontentsinfoList = response.extras.packagetitlecontentsinfoList;
    //let packagetitle = response.extras.packagetitle;

   // console.log(startpoint);
    console.log('shiva package hi');
     console.log(packagetitleList);
     console.log(packagesvalueinfoList);
     console.log(locationinfoList);
     console.log(packagetitleinfoList);
     console.log(packagetitlecontentsinfoList);

     
     res['packagetitleList'] = packagetitleList;
     res['packagesvalueinfoList'] = packagesvalueinfoList;
    res['locationinfoList'] = locationinfoList;     
    res['packagetitleinfoList'] = packagetitleinfoList;
    res['packagetitlecontentsinfoList'] = packagetitlecontentsinfoList;
  //  res['packagetitle'] = packagetitle;
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
