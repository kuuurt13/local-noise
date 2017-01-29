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
import { LocationService } from '../providers/location.service';
import { ConcertService } from '../providers/concert.service';
import { CredentialsService } from '../providers/credentials.service';


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
    CredentialsService,
    Api,
    ConcertService,
    LocationService,
    Storage,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
