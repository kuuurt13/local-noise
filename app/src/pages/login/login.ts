import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserEvent } from 'ionic-native';
import { HomePage } from '../home/home'
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
    public navCtrl: NavController,
    public navParams: NavParams,
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
    console.log(url)
    if (this.loginCredentials.isDefined()) {
      this.credentialsService.set(this.loginCredentials.get());
      this.browser.close();
      this.navCtrl.push(HomePage);
    }
  }
}
