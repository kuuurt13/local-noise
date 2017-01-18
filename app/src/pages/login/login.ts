import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home'
import { Api } from './../../providers/api';
import { LoginCredentialsModel } from './login.model'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private browser: InAppBrowser;
  private loginUrl: string = '/spotify/auth/login';
  private loginCredentials = new LoginCredentialsModel();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public Api: Api
  ) {
    this.loginUrl = Api.url + this.loginUrl;
  }

  ionViewDidLoad() {
    this.browser = new InAppBrowser(this.loginUrl, '_blank', 'location=no');
    this.browser.show();
    this.browser
      .on('loadstart')
      .subscribe((event: InAppBrowserEvent) => this.onLoadStart(event));
  }

  private onLoadStart(event: InAppBrowserEvent): void {
    let { url } = event;

    this.loginCredentials = this.loginCredentials.parse(url);

    if (this.loginCredentials.isDefined()) {
      this.saveCredentials(this.loginCredentials);
      this.browser.close();
      this.navCtrl.push(HomePage);
    }
  }

  private saveCredentials({ token, refresh, id }: LoginCredentialsModel): void {
    this.storage.set('token', token);
    this.storage.set('refresh', refresh);
    this.storage.set('id', id);
  }
}
