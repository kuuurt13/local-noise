import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Api } from './api';
import { CredentialsModel } from '../models/credentials.model';
import { CredentialsService } from './credentials.service';

@Injectable()
export class PlaylistService extends Api {
  private credentials: CredentialsModel;
  private credentials$ = this.credentialsService.subscribe();

  constructor(
    public http: Http,
    public credentialsService: CredentialsService
  ) {
    super(http);
    this.subscribeToCredentials();
  }

  createArtistsPlaylist(artists: string[], name: string): Observable<any> {
    const url = `${this.createPlaylistUrl}/${this.credentials.id}`;
    const data = this.addCredentials({ artists, name });

    return super.post(url, data);
  }

  createTracksPlaylist(tracks: any[], name: string): Observable<any> {
    const url = `${this.createPlaylistUrl}/${this.credentials.id}`;
    const data = this.addCredentials({ tracks, name });
    console.log(url, data)
    return super.post(url, data);
  }

  private addCredentials(params): any {
    return Object.assign(params, this.credentials.get());
  }

  private subscribeToCredentials() {
    this.credentials$
      .map(creds => this.credentials = creds)
      .subscribe();
  }
}
