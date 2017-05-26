import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ConcertService } from '../../providers/concert.service';
import { ConcertsPage } from '../concerts/concerts';

@Component({
  selector: 'page-concert-dates',
  templateUrl: 'concert-dates.html'
})
export class ConcertDatesPage {
  private page: number = 0;
  locationId: string;
  locationName: string;
  concerts: any[] = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storage: Storage,
    private concertService: ConcertService
  ) {}

  ionViewDidLoad() {
    const storageKeys = ['locationId', 'locationName'];
    const locations = storageKeys.map(key => this.storage.get(key));

    Promise.all(locations)
      .then(([id, name]) =>  {
        this.locationId = id;
        this.locationName = name;
        this.getConcerts();
      });

  }

  goToConcerts(concert): void {
    this.navCtrl.push(ConcertsPage, {
      location: this.locationId,
      concert
    });
  }

  private getConcerts(infiniteScroll?: any) {
    this.page++;

    this.concertService
      .searchDates(this.locationId, this.page)
      .map(concerts => {
        this.concerts = this.concerts.concat(concerts);

        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .subscribe();
  }
}
