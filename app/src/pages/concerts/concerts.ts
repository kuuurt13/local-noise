import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Concert } from '../../providers/concert';

@Component({
  selector: 'page-concerts',
  templateUrl: 'concerts.html'
})
export class ConcertsPage {
  private startDate: string;
  private endDate: string;
  private page: number = 0;
  private location: string;
  private concerts: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public concert: Concert
  ) {
    this.location = navParams.get('location');
    this.startDate = navParams.get('startDate');
    this.endDate = navParams.get('endDate');
  }

  ionViewDidLoad() {
    this.getConcerts();
  }

  private getConcerts(infiniteScroll?: any) {
    this.page++;

    this.concert
      .getForDateRange(this.location, this.startDate, this.endDate, this.page)
      .map(res => {
        this.concerts = this.concerts.concat(res.concerts.results);

        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .subscribe();
  }
}
