import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Api } from './api';


@Injectable()
export class ConcertService extends Api {
  constructor(
    public http: Http
  ) {
    super(http);
  }

  public searchDates(location: string, page: number, date?: string): Observable<any> {
    const url = this.concertsSearchDatesUrl;
    const params = {
      location,
      page: page || 1,
      date: date || this.currentDate()
    };

    return this.get(url, params);
  }

  public getDateRange(location: string, start: string, end: string, page: number): Observable<any> {
    const url = this.concertsUrl;
    const params = {
      location,
      start,
      end,
      page: page || 1,
    };

    return this.get(url, params).map(this.removeMissigArtists);
  }

  private currentDate(): string {
    const today = new Date();
    return [
      (today.getMonth() + 1),
      today.getDate(),
      today.getFullYear()
    ].join('/');
  }

  private removeMissigArtists(res: any): boolean {
    if (res.concerts.results) {
      res.concerts.results = res.concerts.results.filter(concert => concert.performance.length);
    }

    return res;
  }
}
