import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Concert } from '../../providers/concert';

@Component({
  selector: 'page-concerts',
  templateUrl: 'concerts.html'
})
export class ConcertsPage {
  private page: number = 0;
  private location: string;
  private concerts: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public concert: Concert
  ) {}

  ionViewDidLoad() {
    this.storage
      .get('locationId')
      .then(location =>  {
        this.location = location;
        this.getConcerts();
      });

  }

  private getConcerts(infiniteScroll?: any) {
    this.page++;

    this.concert
      .search(this.location, this.page)
      .map(concerts => {
        this.concerts = this.concerts.concat(concerts);

        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      })
      .subscribe();
  }
}
