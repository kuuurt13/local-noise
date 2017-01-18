import { ENV } from '../env';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Api {
  public url: string = ENV.API_URL;
}
