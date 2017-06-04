import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CredentialsModel } from '../models/credentials.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class CredentialsService {
  private credentialSubject = new ReplaySubject();

  constructor(
    public storage: Storage
  ) { }

  get(): Promise<CredentialsModel> {
    return this.storage
      .get('credentials')
      .then(creds => new CredentialsModel(JSON.parse(creds)));
  }

  set(creds: any): void {
    this.credentialSubject.next(new CredentialsModel(creds));
    this.storage.set('credentials', JSON.stringify(creds || {}));
  }

  subscribe(): ReplaySubject<any> {
    return this.credentialSubject;
  }

  isDefined(creds: any): boolean {
    return creds && creds.id && creds.refresh && creds.token;
  }
}
