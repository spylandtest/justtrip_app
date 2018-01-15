import {Component} from "@angular/core";
import {NavController, NavParams, MenuController, ModalController, PopoverController,Loading,AlertController,LoadingController} from "ionic-angular";
import {HotelService} from "../../providers/hotel-service";
import {HotelDetailPage} from "../hotel-detail/hotel-detail";
import {NotificationsPage} from "../notifications/notifications";
import {SearchCarsPage} from "../search-cars/search-cars";
import {SearchTripsPage} from "../search-trips/search-trips";
import {HotelPage} from "../hotel/hotel";
import {AccountPage} from "../account/account";
import {SearchBikePage} from "../search-bike/search-bike";
import {TripsPage} from "../trips/trips";
import { SearchpackageserviceProvider } from '../../providers/searchpackageservice/searchpackageservice';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  dDate: Date = new Date();
  searchQuery: string = '';
  items: string[];
  showItems: boolean = false;
  packagetitleList = [];
  loading: Loading;
  createSuccess = false;

  public map: any;
  public childs: any;

  public hotellocation: string;

  // list of hotels
  public hotels: any;

  // search conditions
  public checkin = {
    name: "Check-in",
    date: this.dDate.toISOString()
  }

  public checkout = {
    name: "Check-out",
    date: new Date(this.dDate.setDate(this.dDate.getDate() + 1)).toISOString()
  }

  constructor(public nav: NavController, public navParams: NavParams, public menuCtrl: MenuController, public modalCtrl: ModalController, public popoverCtrl: PopoverController, public hotelService: HotelService,public searchpackages:SearchpackageserviceProvider, private alertCtrl: AlertController,private loadingCtrl: LoadingController) {
    // set sample data
    this.menuCtrl.swipeEnable(true, 'authenticated');
    this.hotels = hotelService.getAll();
  }

  ionViewDidLoad() {
    // init map
    this.initializeMap();
  }

  initializeMap() {
    let latLng = new google.maps.LatLng(this.hotels[0].location.lat, this.hotels[0].location.lon);

    let mapOptions = {
      center: latLng,
      zoom: 11,
      scrollwheel: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    }

    this.map = new google.maps.Map(document.getElementById("home-map"), mapOptions);

    // add markers to map by hotel
    for (let i = 0; i < this.hotels.length; i++) {
      let hotel = this.hotels[i];
      new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(hotel.location.lat, hotel.location.lon)
      });
    }

    // refresh map
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 300);
  }  

  initializeItems() {
    this.items = [
      'La Belle Place - Rio de Janeiro',
      'Marshall Hotel - Marshall Islands',
      'Maksoud Plaza - São Paulo',
      'Hotel Copacabana - Rio de Janeiro',
      'Pousada Marés do amanhã - Maragogi'
    ];
  }

  itemSelected(item: string) {
    this.hotellocation = item;
    this.showItems = false;
  }

  childrenArr(chil) {
    let child = Number(chil);
    this.childs = Array(child).fill(0).map((v,i) => i);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.showItems = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.showItems = false;
    }
  }


  doSearch() {
    //this.nav.push(TripsPage);
    this.showLoading()
    this.searchpackages.searchpackagedetails().subscribe(res => {
    let success = res['access'];
    
    
    if (success) {
    
      this.packagetitleList = res['packagetitleList'];
          this.createSuccess = true;
          setTimeout(() => {
          this.loading.dismiss();
       });
       console.log(this.packagetitleList);
           
    
       this.nav.push(TripsPage, {packagetitleList: this.packagetitleList});
      // this.showPopup("Success", "Successfully Registered");
    } else {
      let message = res['message'];
      if(message)
      {
         setTimeout(() => {
          this.loading.dismiss();
       });
       this.showPopup("Error",message);
      }
     else
     {
        setTimeout(() => {
          this.loading.dismiss();
       });
       this.showPopup("Error", "Problem creating account.");
     }
    }
    },
    error => {
    setTimeout(() => {
          this.loading.dismiss();
       });
    this.showPopup("Error", error);
    });
  }

  // view hotel detail
  viewHotel(hotel) {
    this.nav.push(HotelDetailPage, hotel);
  }

  // view all hotels
  viewHotels() {
    this.nav.push(HotelPage);
  }

  // go to search car page
  searchCar() {
    this.nav.push(SearchCarsPage);
  }

  searchBike() {
    this.nav.push(SearchBikePage);
  }

  // go to search trip page
  searchTrip() {
    this.nav.push(SearchTripsPage);
  }

  // to go account page
  goToAccount() {
    this.nav.push(AccountPage);
  }


  presentNotifications(myEvent) {
    console.log(myEvent);
    let popover = this.popoverCtrl.create(NotificationsPage);
    popover.present({
      ev: myEvent
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
   });
    this.loading.present();
  }
  
  showPopup(title, text) {
  let alert = this.alertCtrl.create({
  title: title,
  subTitle: text,
  buttons: [
   {
     text: 'OK',
     handler: data => {
       if (this.createSuccess) {
         this.nav.popToRoot();
       }
     }
   }
  ]
  });
  alert.present();
  }

}

// 
