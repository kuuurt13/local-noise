import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { App} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationService } from '../../providers/location.service';
import { Storage } from '@ionic/storage';
import { LocationModel } from '../../models/location.model';
import { ConcertDatesPage } from '../concert-dates/concert-dates';

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  private searchSubject: Subject<any> = new Subject();
  locations: LocationModel[];

  constructor(
    public appCtrl: App,
    public locationService: LocationService,
    public storage: Storage,
    private geolocation: Geolocation
  ) {
    this.subscribeToSearch();
   }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        let { latitude, longitude } = resp.coords;
        this.searchByCoordinates(latitude, longitude);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  setLocation(location: LocationModel) {
    this.storage.set('locationName', location.displayName);
    this.storage.set('locationId', location.id);
    this.appCtrl.getRootNav().push(ConcertDatesPage);
  }

  onSearch(event: any) {
    this.searchSubject.next(event);
  }

  searchByCoordinates(latitude: number, longitude: number) {
    this.locationService
      .searchByCoordinates(latitude, longitude)
      .map(({ results }) => this.locations = results)
      .subscribe();
  }

  searchByName(query: string) {
    this.locationService
      .searchByName(query)
      .map(({ results }) => {
        if (results.length) {
          return this.locations = results;
        }

        return this.locations = this.locations.filter(locale => {
          const { displayName } = locale;
          return displayName.toLowerCase().indexOf(query) > -1;
        })
      })
      .subscribe();
  }

  private subscribeToSearch() {
    this.searchSubject
      .map(event => event.target.value)
      .filter(value => value.length > 2)
      .debounceTime(750)
      .distinctUntilChanged()
      .map(value => this.searchByName(value))
      .subscribe();
  }
}
