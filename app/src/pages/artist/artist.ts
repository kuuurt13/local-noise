import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SetlistService } from '../../providers/setlist.service';


@Component({
  selector: 'page-artist',
  templateUrl: 'artist.html'
})
export class ArtistPage {
  artist: any;
  set: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public setlistService: SetlistService
  ) {
    this.artist = navParams.get('artist');
  }

  ionViewDidLoad() {
    this.getSetlist();
  }

  private getSetlist() {
    const { identifier } = this.artist;

    if (identifier && identifier[0].mbid) {
      this.setlistService
        .getSetlist(identifier[0].mbid)
        .map(setlist => this.set = setlist)
        .subscribe();
    }
  }

}
