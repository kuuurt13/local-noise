import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CredentialsModel } from '../models/credentials.model';

@Injectable()
export class StorageService extends Storage {
	private modelMap = {
		credentials: (m) => { return new CredentialsModel(m) }
	};

  constructor(
    public storage: Storage
  ) {
  	super();
  }

  getAll(...keys: string[]): Promise<any[]>  {
    const reqs = this.getRequests(keys);

    return Promise.all(reqs);
  }

	private getRequests(keys: string[]): any[] {
		return keys.map(key => {
		  if (this.modelMap[key]) {
				return this.storage
					.get(key)
					.then(data => this.modelMap[key](JSON.parse(data)))
			}

			return this.storage.get(key)
    });
	}
}
