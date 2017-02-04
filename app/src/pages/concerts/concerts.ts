import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConcertService } from '../../providers/concert.service';
import { PlaylistService } from '../../providers/playlist.service';
import { ArtistPage } from '../artist/artist';

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
    public concertService: ConcertService,
    public playlistService: PlaylistService
  ) {
    this.location = navParams.get('location');
    this.startDate = navParams.get('startDate');
    this.endDate = navParams.get('endDate');
  }

  ionViewDidLoad() {
    this.getConcerts();
  }

  exportConcerts(concerts) {
    this.playlistService
      .createArtistsPlaylist(this.getArtists(concerts), this.getPlaylistName())
      .subscribe();
  }

  goToArtist(artist: any) {
    this.navCtrl.push(ArtistPage, {
      artist
    });
  }

  getConcerts(infiniteScroll?: any) {
    this.page++;

    this.concertService
      .getDateRange(this.location, this.startDate, this.endDate, this.page)
      .map(({ concerts }) => {
        const { results = [], totalEntries = 0 } = concerts;

        this.concerts = this.concerts.concat(results);

        if (infiniteScroll) {
          infiniteScroll.complete();
          infiniteScroll.enable(totalEntries < this.concerts.length);
        }
      })
      .subscribe();
  }

  getArtists(concerts: any[]): string[] {
    return concerts.map(concert => {
      return concert.performance[0].artist.displayName;
    });
  }

  private getPlaylistName(): string {
    return `${this.location}: ${this.startDate} - ${this.endDate}`;
  }
}
