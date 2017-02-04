import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SetlistService } from '../../providers/setlist.service';
import { PlaylistService } from '../../providers/playlist.service';


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
    public setlistService: SetlistService,
    public playlistService: PlaylistService
  ) {
    this.artist = navParams.get('artist');
  }

  ionViewDidLoad() {
    this.getSetlist();
  }

  createPlaylist(artist: string, setlist: any[]) {
    const tracks = setlist.map(song => {
      if (song.cover) {
        return { artist: song.cover.name, name: song.name };
      }
      return { artist, name: song.name };
    });

    this.playlistService
      .createTracksPlaylist(tracks, `${this.artist.displayName} Setlist`)
      .subscribe();
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
