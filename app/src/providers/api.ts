import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ENV } from '../env';


@Injectable()
export class Api {
  url: string = ENV.API_URL;

  // Songkick
  artistsUrl: string = `${this.url}/songkick/artists`;
  concertsUrl: string = `${this.url}/songkick/concerts`;
  concertsSearchDatesUrl = `${this.url}/songkick/concerts/search`;
  locationUrl = `${this.url}/songkick/locations`;

  // Spotify
  loginUrl: string = `${this.url}/spotify/auth/login`;

  constructor (
    public http: Http
  ) {}

  get(url: string, params: any): Observable<any> {
    const search: URLSearchParams = this.getParams(params);

    return this.http
      .get(url, {
        search
      })
      .map(res => res.json());
  }

  private getParams(params: any = {}): URLSearchParams {
    const urlParams: URLSearchParams = new URLSearchParams();

    Object.keys(params).forEach(key => {
      urlParams.set(key, params[key]);
    });

    return urlParams;
  }
}
