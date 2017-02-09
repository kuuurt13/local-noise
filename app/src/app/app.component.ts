import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ENV } from '../env';
import { CredentialsService } from '../providers/credentials.service';
import { StorageService } from '../providers/storage.service';
import { ConcertDatesPage } from '../pages/concert-dates/concert-dates';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(
    platform: Platform,
    public appController: App,
    public credentialsService: CredentialsService,
    public storage: StorageService
  ) {
    platform.ready()
    .then(() => storage.getAll('locationId', 'credentials'))
    .then(res => {
      this.setupDev();
      this.redirect(res);
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  private setupDev() {
    const { ENVIRONMENT, SPOTIFY_CREDENTIALS } = ENV as any;

    if (ENVIRONMENT === 'dev' && SPOTIFY_CREDENTIALS) {
      this.credentialsService.set(SPOTIFY_CREDENTIALS);
    }
  }

  private redirect([ location, credentials ]: any[]) {
    let page: any = LoginPage;

    if (location && credentials.isDefined()) page = ConcertDatesPage;

    return this.appController.getRootNav().push(page);
  }
}
