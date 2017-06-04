import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ENV } from '../env';
import { CredentialsService } from '../providers/credentials.service';
import { StorageService } from '../providers/storage.service';
import { ConcertDatesPage } from '../pages/concert-dates/concert-dates';
import { LoginPage } from '../pages/login/login';
import { LocationPage } from '../pages/location/location';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(
    private platform: Platform,
    private appController: App,
    private credsService: CredentialsService,
    private storage: StorageService,
    private statusBar: StatusBar,
    private splashscreen: SplashScreen
  ) {
    platform.ready()
    .then(() => this.setupDev())
    .then(() => storage.getAll('locationId', 'credentials'))
    .then(res => {
      statusBar.styleDefault();
      splashscreen.hide();
      this.redirect(res);
    });
  }

  private setupDev() {
    const { ENVIRONMENT, SPOTIFY_CREDENTIALS } = ENV as any;

    if (ENVIRONMENT === 'dev' && SPOTIFY_CREDENTIALS) {
      this.credsService.set(SPOTIFY_CREDENTIALS);
    }
  }

  private redirect([ location, credentials ]: any[]) {
    let page: any = this.credsService.isDefined(credentials) ? LocationPage : LoginPage;

    if (location && credentials.isDefined()) page = ConcertDatesPage;

    return this.appController.getRootNav().push(page);
  }
}
