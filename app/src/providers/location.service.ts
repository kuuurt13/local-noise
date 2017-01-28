import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Api } from './api';


@Injectable()
export class LocationService extends Api {

  constructor(
    public http: Http
  ) {
    super(http);
  }

  public searchByCoordinates(lat: number, lng: number): Observable<any> {
    const url = this.locationUrl;
    const params = {
      location: `${lat},${lng}`
    };

    return this
      .get(url, params)
      .map(data => {
        data.results = data.results.map(res => res.metroArea);

        return data;
      });
  }
}
