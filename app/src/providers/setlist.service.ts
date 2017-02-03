import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Api } from './api';

@Injectable()
export class SetlistService extends Api {

  constructor(public http: Http) {
    super(http);
  }

  getSetlist(id: string): Observable<any>  {
    const url: string = `${this.setlistUrl}/${id}`;

    return super.get(url);
  }

}
