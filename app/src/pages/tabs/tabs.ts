import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { LocationPage } from '../location/location';
import { ConcertsPage } from '../concerts/concerts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = LoginPage;
  tab3Root: any = LocationPage;
  tab4Root: any = ConcertsPage;

  constructor() {

  }
}
