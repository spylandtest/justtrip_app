import {Injectable} from "@angular/core";
import {HOTELS} from "../mocks/mock-hotels";

@Injectable()
export class HotelService {
  hotels: any;
  favoriteCounter: number = 0;
  favorites: Array<any> = [];

  constructor() {
    this.hotels = HOTELS;
  }

  getAll() {
    return this.hotels;
  }

  getItem(id) {
    for (var i = 0; i < this.hotels.length; i++) {
      if (this.hotels[i].id === parseInt(id)) {
        return this.hotels[i];
      }
    }
    return null;
  }

  remove(item) {
    this.hotels.splice(this.hotels.indexOf(item), 1);
  }

  /////
  //For Search and Favorites
  ////
  findAll() {
    return Promise.resolve(this.hotels);
  }

  findById(id) {
    return Promise.resolve(this.hotels[id - 1]);
  }

  findByName(searchKey: string) {
    let key: string = searchKey.toUpperCase();
    return Promise.resolve(this.hotels.filter((property: any) =>
        (property.title +  ' ' +property.address +  ' ' + property.city + ' ' + property.description).toUpperCase().indexOf(key) > -1));
  }

  getFavorites() {
    return Promise.resolve(this.favorites);
  }

  favorite(hotel) {
    this.favoriteCounter = this.favoriteCounter + 1;
    this.favorites.push({id: this.favoriteCounter, hotel: hotel});
    return Promise.resolve();
  }

  unfavorite(favorite) {
    let index = this.favorites.indexOf(favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return Promise.resolve();
  }
}
