import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent,InAppBrowserObject } from '@ionic-native/in-app-browser';
import { LocationPage } from '../location/location'
import { Api } from './../../providers/api';
import { CredentialsService } from '../../providers/credentials.service';
import { CredentialsModel } from '../../models/credentials.model';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private browser: InAppBrowserObject;
  private loginUrl: string;
  private loginCredentials = new CredentialsModel();

  constructor(
    public appCtrl: App,
    public credentialsService: CredentialsService,
    public api: Api,
    private iab: InAppBrowser
  ) {
    this.loginUrl = api.loginUrl;
  }

  ionViewDidLoad() {
    this.browser = this.iab.create(this.loginUrl, '_blank', 'location=no');
    this.browser.show();
    this.browser
      .on('loadstart')
      .subscribe((event) => this.onLoadStart(event));
  }

  private onLoadStart(event: InAppBrowserEvent): void {
    let { url } = event;

    this.loginCredentials = this.loginCredentials.parse(url);

    if (this.loginCredentials.isDefined()) {
      this.credentialsService.set(this.loginCredentials.get());
      this.browser.close();
      this.appCtrl.getRootNav().push(LocationPage);
    }
  }
}
