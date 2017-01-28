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
  private location: string;
  private concerts: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public concertService: ConcertService
  ) {}

  ionViewDidLoad() {
    this.storage
      .get('locationId')
      .then(location =>  {
        this.location = location;
        this.getConcerts();
      });

  }

  public goToConcerts(concert): void {
    this.navCtrl.push(ConcertsPage, {
      location: this.location,
      startDate: concert.start,
      endDate: concert.end
    });
  }

  private getConcerts(infiniteScroll?: any) {
    this.page++;

    this.concertService
      .searchDates(this.location, this.page)
      .map(concerts => {
        this.concerts = this.concerts.concat(concerts);

        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .subscribe();
  }
}
