import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HotelService} from "../../providers/hotel-service";
import {HotelDetailPage} from "../hotel-detail/hotel-detail";

@Component({
    selector: 'page-favorite-list',
    templateUrl: 'favorite-list.html'
})
export class FavoriteListPage {

    favorites: Array<any> = [];

    constructor(public navCtrl: NavController, public service: HotelService) {
        this.getFavorites();
        // console.log(this.favorites);
    }

    itemTapped(favorite) {
        this.navCtrl.push(HotelDetailPage, favorite);
    }

    deleteItem(favorite) {
        this.service.unfavorite(favorite)
            .then(() => {
                this.getFavorites();
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    getFavorites() {
        this.service.getFavorites()
            .then(data => { this.favorites = data; });
    }

}
