import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from 'ionic-native';
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { LocationPage } from '../pages/location/location';
import { ConcertDatesPage } from '../pages/concert-dates/concert-dates';
import { ConcertsPage } from '../pages/concerts/concerts';

// Components
import { ArtistImageComponent } from '../components/artist-image/artist-image';

// Providers
import { Api } from '../providers/api';
import { Location } from '../providers/location';
import { Concert } from '../providers/concert';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    LocationPage,
    ConcertDatesPage,
    ConcertsPage,
    ArtistImageComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    LocationPage,
    ConcertDatesPage,
    ConcertsPage
  ],
  providers: [
    Concert,
    Location,
    Api,
    Storage,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
