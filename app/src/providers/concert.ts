import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Api } from './api';

@Injectable()
export class Concert {
  private concertEndpoint: string;
  private concertSearchDatesEndpoint: string;
  private concertGetDatesEndpoint: string;


  constructor(
    public http: Http,
    public api: Api
  ) {
    this.concertEndpoint = `${api.url}/songkick/concerts`;
    this.concertSearchDatesEndpoint = `${api.url}/songkick/concerts/search`;
    this.concertGetDatesEndpoint = `${api.url}/songkick/concerts`;
  }

  public searchDates(location: string, page: number, date?: string): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();

    params.set('location', location);
    params.set('page', page.toString() || '1');
    params.set('date', date || this.currentDate());

    return this.http
      .get(this.concertSearchDatesEndpoint, {
        search: params
      })
      .map(res => res.json());
  }

  public getForDateRange(location: string, start: string, end: string, page: number): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();

    params.set('location', location);
    params.set('page', page.toString() || '1');
    params.set('start', start);
    params.set('end', end);

    return this.http
      .get(this.concertGetDatesEndpoint, {
        search: params
      })
      .map(res => res.json());
  }

  private currentDate(): string {
    const today = new Date();
    return [
      (today.getMonth() + 1),
      today.getDate(),
      today.getFullYear()
    ].join('/');
  }
}
