import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from './api';


@Injectable()
export class Location {
  private locationEndpoint: string;

  constructor(
    public http: Http,
    public api: Api
  ) {
    this.locationEndpoint = `${api.url}/songkick/locations`;
  }

  public searchByCoordinates(lat: number, lng: number): any {
    let params: URLSearchParams = new URLSearchParams();
    params.set('location', `${lat},${lng}`);

    return this.http
      .get(this.locationEndpoint, {
        search: params
      })
      .map(res => {
        let data: any = res.json();

        data.results = data.results.map(res => res.metroArea);

        return data;
      });
  }
}
