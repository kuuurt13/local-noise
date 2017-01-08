import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InAppBrowser, InAppBrowserEvent } from 'ionic-native';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private browser: InAppBrowser;
  private debug: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.browser = new InAppBrowser('https://ionic.io', '_blank', 'location=no');
    this.browser.show();
    this.browser.on('loadstart').subscribe((event: InAppBrowserEvent) => this.onLoadStart(event));
  }

  private onLoadStart(event: InAppBrowserEvent): void {
    this.debug = event.url;
    this.browser.close();
  }
}
