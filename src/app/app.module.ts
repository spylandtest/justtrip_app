import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import { IonicStorageModule  } from '@ionic/storage';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';
import { HttpModule  } from '@angular/http';

import {HotelService} from "../providers/hotel-service";
import {PlaceService} from "../providers/place-service";
import {ActivityService} from "../providers/activity-service";
import {CarService} from "../providers/car-service";
import {TripService} from "../providers/trip-service";

import {MyApp} from "./app.component";

import {AccountPage} from "../pages/account/account";
import {CarDetailPage} from "../pages/car-detail/car-detail";
import {CarsPage} from "../pages/cars/cars";
import {CheckoutCarPage} from "../pages/checkout-car/checkout-car";
import {CheckoutHotelPage} from "../pages/checkout-hotel/checkout-hotel";
import {CheckoutTripPage} from "../pages/checkout-trip/checkout-trip";
import {EditProfilePage} from "../pages/edit-profile/edit-profile";
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {HomePage} from "../pages/home/home";
import {HotelPage} from "../pages/hotel/hotel";
import {HotelDetailPage} from "../pages/hotel-detail/hotel-detail";
import {LoginPage} from "../pages/login/login";
import {NotificationsPage} from "../pages/notifications/notifications";
import {RegisterPage} from "../pages/register/register";
import {ReviewsPage} from "../pages/reviews/reviews";
import {SearchCarsPage} from "../pages/search-cars/search-cars";
import {SearchLocationPage} from "../pages/search-location/search-location";
import {SearchTripsPage} from "../pages/search-trips/search-trips";
import {TabReviewsPage} from "../pages/tab-reviews/tab-reviews";
import {TripDetailPage} from "../pages/trip-detail/trip-detail";
import {TripsPage} from "../pages/trips/trips";
import {UserdetailPage} from "../pages/userdetail/userdetail";
import {PaysuccessPage} from "../pages/paysuccess/paysuccess";
import {SearchBikePage} from "../pages/search-bike/search-bike";
import {ViewmorepackagePage} from "../pages/viewmorepackage/viewmorepackage";
import {PackageconfirmbookingPage} from "../pages/packageconfirmbooking/packageconfirmbooking";
import {PackagepaymentmodePage} from "../pages/packagepaymentmode/packagepaymentmode";
import {BikesPage} from "../pages/bikes/bikes";
import {BikedetailsPage} from "../pages/bikedetails/bikedetails";
import {BikeuserdetailsPage} from "../pages/bikeuserdetails/bikeuserdetails";


import { LocationserviceProvider } from '../providers/locationservice/locationservice';
import { SearchdetailsserviceProvider } from '../providers/searchdetailsservice/searchdetailsservice';
import { BookingsubmittserviceProvider } from '../providers/bookingsubmittservice/bookingsubmittservice';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PaymentcompleteserviceProvider } from '../providers/paymentcompleteservice/paymentcompleteservice';
import { SearchpackageserviceProvider } from '../providers/searchpackageservice/searchpackageservice';
import { PackagedetailserviceProvider } from '../providers/packagedetailservice/packagedetailservice';
import { PackagebookingserviceProvider } from '../providers/packagebookingservice/packagebookingservice';
import { PaymentpackageserviceProvider } from '../providers/paymentpackageservice/paymentpackageservice';
import { LoginserviceProvider } from '../providers/loginservice/loginservice';
import { AuthserviceProvider } from '../providers/authservice/authservice';
import { SearchbikeserviceProvider } from '../providers/searchbikeservice/searchbikeservice';

// import services
// end import services
// end import services

// import pages
// end import pages

@NgModule({
  declarations: [
    MyApp,
    AccountPage,
    CarDetailPage,
    CarsPage,
    CheckoutCarPage,
    CheckoutHotelPage,
    CheckoutTripPage,
    EditProfilePage,
    FavoriteListPage,
    HomePage,
    HotelPage,
    HotelDetailPage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    ReviewsPage,
    SearchCarsPage,
    SearchLocationPage,
    SearchTripsPage,
    TabReviewsPage,
    TripDetailPage,
    TripsPage,
    UserdetailPage,
    PaysuccessPage,
    SearchBikePage,
    ViewmorepackagePage,
    PackageconfirmbookingPage,
    PackagepaymentmodePage,
    BikesPage,
    BikedetailsPage,
    BikeuserdetailsPage
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      // mode: 'md', --> uncomment in case you'll do an Web App (PWA) build.
      scrollPadding: false,
      scrollAssist: true, 
      autoFocusAssist: false
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccountPage,
    CarDetailPage,
    CarsPage,
    CheckoutCarPage,
    CheckoutHotelPage,
    CheckoutTripPage,
    EditProfilePage,
    FavoriteListPage,
    HomePage,
    HotelPage,
    HotelDetailPage,
    LoginPage,
    NotificationsPage,
    RegisterPage,
    ReviewsPage,
    SearchCarsPage,
    SearchLocationPage,
    SearchTripsPage,
    TabReviewsPage,
    TripDetailPage,
    TripsPage,
    UserdetailPage,
    PaysuccessPage,
    SearchBikePage,
    ViewmorepackagePage,
    PackageconfirmbookingPage,
    PackagepaymentmodePage,
    BikesPage,
    BikedetailsPage,
    BikeuserdetailsPage
  ],
  providers: [
    StatusBar,
    HttpModule,
    SplashScreen,
    Keyboard,
    HotelService,
    PlaceService,
    ActivityService,
    CarService,
    TripService,
    CarService,
    TripService,
    LocationserviceProvider,
    SearchdetailsserviceProvider,
    BookingsubmittserviceProvider,
    InAppBrowser,
    PaymentcompleteserviceProvider,
    SearchpackageserviceProvider,
    PackagedetailserviceProvider,
    PackagebookingserviceProvider,
    PaymentpackageserviceProvider,
    LoginserviceProvider,
    AuthserviceProvider,
    SearchbikeserviceProvider
  ]
})

export class AppModule {
}
