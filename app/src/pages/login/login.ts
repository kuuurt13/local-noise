import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent } from 'ionic-native';
import { LocationPage } from '../location/location'
import { Api } from './../../providers/api';
import { CredentialsService } from '../../providers/credentials.service';
import { CredentialsModel } from '../../models/credentials.model';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private browser: InAppBrowser;
  private loginUrl: string;
  private loginCredentials = new CredentialsModel();

  constructor(
    public appCtrl: App,
    public credentialsService: CredentialsService,
    public api: Api
  ) {
    this.loginUrl = api.loginUrl;
  }

  ionViewDidLoad() {
    this.browser = new InAppBrowser(this.loginUrl, '_blank', 'location=no');
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
