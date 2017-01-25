import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Api } from './api';

@Injectable()
export class Concert {
  private concertEndpoint: string;
  private concertSearchEndpoint: string;
  private locationId: string;

  constructor(
    public http: Http,
    public api: Api
  ) {
    this.concertEndpoint = `${api.url}/songkick/concerts`;
    this.concertSearchEndpoint = `${api.url}/songkick/concerts/search`;
  }

  public search(location: string, page: number, date?: string,): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();

    params.set('location', location);
    params.set('page', page.toString() || '1');
    params.set('date', date || this.currentDate());

    return this.http
      .get(this.concertSearchEndpoint, {
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
