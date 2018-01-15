import {Component} from "@angular/core";
import {NavController, NavParams, Platform, ToastController} from "ionic-angular";
import {HotelService} from "../../providers/hotel-service";
import {ReviewsPage} from "../reviews/reviews";
import {CheckoutHotelPage} from "../checkout-hotel/checkout-hotel";

declare var google: any;

@Component({
  selector: 'page-hotel-detail',
  templateUrl: 'hotel-detail.html'
})
export class HotelDetailPage {
  // hotel info
  public hotel: any;
  // Map
  public map: any;
  //
  public arr: any = Array;

  constructor(public nav: NavController, public navParams: NavParams, public hotelService: HotelService, public platform: Platform, public toastCtrl: ToastController) {
    // set sample data
    // this.hotel = hotelService.getItem(1);
    this.hotel = this.navParams.data;
  }

  ionViewDidLoad() {
    // init map
    this.initializeMap();
  }

  initializeMap() {
    let latLng = new google.maps.LatLng(this.hotel.location.lat, this.hotel.location.lon);

    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false
    }

    this.map = new google.maps.Map(document.getElementById("map-detail"), mapOptions);
    new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    // refresh map
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 300);
  }

  // view a room
  viewRoom(room) {
    for (let i = 0; i < this.hotel.rooms.length; i++) {
      this.hotel.rooms[i].active = false;
    }

    room.active = true;
  }

  // go to reviews page
  viewReviews() {
    this.nav.push(ReviewsPage);
  }

  // go to checkout page
  checkout() {
    this.nav.push(CheckoutHotelPage);
  }

  favorite(hotel) {
      this.hotelService.favorite(hotel)
          .then(property => {
              let toast = this.toastCtrl.create({
                  message: 'Hotel added to your favorites',
                  cssClass: 'mytoast',
                  duration: 2000
              });
              toast.present(toast);
          });
  }

}
