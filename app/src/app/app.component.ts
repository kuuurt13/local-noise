import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { ENV } from '../env';
import { TabsPage } from '../pages/tabs/tabs';
import { CredentialsService } from '../providers/credentials.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(
    platform: Platform,
    public credentialsService: CredentialsService
  ) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();

      if (ENV && ENV.ENVIRONMENT === 'dev') {
        this.setupDev();
      }
    });
  }

  private setupDev() {
    const { SPOTIFY_CREDENTIALS = {} } = ENV;
    this.credentialsService.set(SPOTIFY_CREDENTIALS);
  }
}
