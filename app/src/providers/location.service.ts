import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Api } from './api';
import { LocationModel } from '../models/location.model';


@Injectable()
export class LocationService extends Api {

  constructor(public http: Http) {
    super(http);
  }

  searchByCoordinates(lat: number, lng: number): Observable<any> {
    const url = this.locationUrl;
    const params = {
      location: `${lat},${lng}`
    };

    return super
      .get(url, params)
      .map(this.unwrap)
      .map(this.getDistinct);
  }

  searchByName(query: string): Observable<any> {
    const url = this.locationUrl;
    const params = { query };

    return super
      .get(url, params)
      .map(this.unwrap)
      .map(this.getDistinct);
  }

  private unwrap(data: any): any {
    data.results = data.results || [];
    data.results = data.results.map(res => res.metroArea);

    return data;
  }

  private getDistinct(data: any) {
    data.results = data.results.reduce((locales, locale) => {
      if (!locales.find(loc => loc.id === locale.id)) {
        locales.push(new LocationModel(locale));
      }
      return locales;
    }, []);

    return data;
  }
}
