import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { NavController, NavParams } from 'ionic-angular';
import { ConcertService } from '../../providers/concert.service';
import { PlaylistService } from '../../providers/playlist.service';
import { ConcertDetailPage } from '../concert-detail/concert-detail';

@Component({
  selector: 'page-concerts',
  templateUrl: 'concerts.html'
})
export class ConcertsPage {
  private startDate: string;
  private endDate: string;
  private page: number = 0;
  private location: string;
  private locationName: string;
  private datePipe: DatePipe = new DatePipe('en-US');
  concerts: any[] = [];
  title: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public concertService: ConcertService,
    public playlistService: PlaylistService,
    public appBrowser: InAppBrowser
  ) {
    this.location = navParams.get('location');
    this.locationName = navParams.get('locationName');
    const { start, end, title } = navParams.get('concert');

    this.startDate = start;
    this.endDate = end;
    this.title = title;
  }

  ionViewDidLoad() {
    this.getConcerts();
  }

  exportConcerts(concerts) {
    this.playlistService
      .createArtistsPlaylist(this.getArtists(concerts), this.getPlaylistName())
      .subscribe(({ uri }) => this.appBrowser.create(uri, '_system', 'location=no'));
  }

  goToConcert(concert: any) {
    this.navCtrl.push(ConcertDetailPage, {
      concert
    });
  }

  getConcerts(infiniteScroll?: any) {
    this.page++;

    this.concertService
      .getDateRange(this.location, this.startDate, this.endDate, this.page)
      .map(({ concerts }) => {
        const { results = [], totalEntries = 0 } = concerts;

        this.concerts = this.concerts.concat(this.mapDates(results));

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
    return `${this.locationName}: ${this.startDate} - ${this.endDate}`;
  }

  private mapDates(concerts:  any[]): any[] {
    return concerts.map(concert => {
      concert.date = {
        month: this.datePipe.transform(new Date(concert.start.date), 'MMM'),
        day: this.datePipe.transform(new Date(concert.start.date), 'd')
      };

      return concert;
    });
  }
}
