import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ConcertService } from '../../providers/concert.service';
import { CredentialsService } from '../../providers/credentials.service';
import { CredentialsModel } from '../../models/credentials.model';

@Component({
  selector: 'page-concerts',
  templateUrl: 'concerts.html'
})
export class ConcertsPage {
  private credentials: CredentialsModel;
  private startDate: string;
  private endDate: string;
  private page: number = 0;
  private location: string;
  private concerts: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public credentialsService: CredentialsService,
    public concertService: ConcertService
  ) {
    this.location = navParams.get('location');
    this.startDate = navParams.get('startDate');
    this.endDate = navParams.get('endDate');
  }

  ionViewDidLoad() {
    this.credentialsService
      .get()
      .then(creds => this.credentials = creds);

    this.getConcerts();
  }

  private getConcerts(infiniteScroll?: any) {
    this.page++;

    this.concertService
      .getDateRange(this.location, this.startDate, this.endDate, this.page)
      .map(({ concerts }) => {
        const { results = [], totalEntries = 0 } = concerts;

        this.concerts = this.concerts.concat(results);
        console.log(this.concerts);

        if (infiniteScroll) {
          infiniteScroll.complete();
          infiniteScroll.enable(totalEntries < this.concerts.length);
        }
      })
      .subscribe();
  }

  private exportConcerts(concerts): void {
    const artists = this.getArtists(concerts);
    this.concertService
      .createPlaylistArtists(artists, this.getPlaylistName(), this.credentials)
      .subscribe();
  }

  private getArtists(concerts: any[]): string[] {
    return concerts.map(concert => {
      return concert.performance[0].artist.displayName;
    });
  }

  private getPlaylistName(): string {
    return `${this.location}: ${this.startDate} - ${this.endDate}`;
  }
}
