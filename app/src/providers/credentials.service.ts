import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CredentialsModel } from '../models/credentials.model';

@Injectable()
export class CredentialsService {

  constructor(
    public storage: Storage
  ) { }

  get(): Promise<CredentialsModel> {
    return this.storage
      .get('credentials')
      .then(creds => new CredentialsModel(JSON.parse(creds)));
  }

  set(creds: any): void {
    creds = JSON.stringify(creds || {});
    this.storage.set('credentials', creds);
  }
}
