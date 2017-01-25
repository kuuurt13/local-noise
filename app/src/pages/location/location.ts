import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Location } from '../../providers/location';
import { Storage } from '@ionic/storage';
import { LocationModel } from './location.model';

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  private locations: LocationModel[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public location: Location,
    public storage: Storage
  ) { }

  ionViewDidLoad() {
    Geolocation.getCurrentPosition()
      .then((resp) => {
        let { latitude, longitude } = resp.coords;
        this.searchByCoordinates(latitude, longitude);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  public setLocation(location: LocationModel): void {
    this.storage.set('locationName', location.displayName);
    this.storage.set('locationId', location.id);
  }

  private searchByCoordinates(latitude, longitude): void {
    this.location
      .searchByCoordinates(latitude, longitude)
      .map(({ results }) => {
        this.locations = results.reduce((locales, locale) => {
          if (!locales.find(loc => loc.id === locale.id)) {
            locales.push(new LocationModel(locale));
          }
          return locales;
        }, []);
      })
      .subscribe();
  }
}
