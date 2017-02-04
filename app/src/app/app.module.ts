import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from 'ionic-native';
import { MyApp } from './app.component';

// Providers
import { ProvidersModule } from '../providers/providers.module';

// Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { LocationPage } from '../pages/location/location';
import { ConcertDatesPage } from '../pages/concert-dates/concert-dates';
import { ConcertsPage } from '../pages/concerts/concerts';
import { ArtistPage } from '../pages/artist/artist';

// Components
import { ArtistImageComponent } from '../components/artist-image/artist-image';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    LocationPage,
    ConcertDatesPage,
    ConcertsPage,
    ArtistPage,
    ArtistImageComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    ProvidersModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    LocationPage,
    ConcertDatesPage,
    ConcertsPage,
    ArtistPage
  ],
  providers: [
    Storage,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
