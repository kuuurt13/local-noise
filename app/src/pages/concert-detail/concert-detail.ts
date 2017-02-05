import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ArtistPage } from '../artist/artist';


@Component({
  selector: 'page-concert-detail',
  templateUrl: 'concert-detail.html'
})
export class ConcertDetailPage {
  concert: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.concert = navParams.get('concert');
  }

  goToArtist(artist: any) {
    this.navCtrl.push(ArtistPage, {
      artist
    });
  }

}
