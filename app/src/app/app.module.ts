import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

// Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { InAppBrowser } from '@ionic-native/in-app-browser';

// Modules
import { SharedModule } from '../shared/shared.module';
import { ProvidersModule } from '../providers/providers.module';

//App
import { MyApp } from './app.component';

// Config
import storageConfig from '../config/storage.config';

// Pages
import { LoginPage } from '../pages/login/login';
import { LocationPage } from '../pages/location/location';
import { ConcertDatesPage } from '../pages/concert-dates/concert-dates';
import { ConcertsPage } from '../pages/concerts/concerts';
import { ConcertDetailPage } from '../pages/concert-detail/concert-detail';
import { ArtistPage } from '../pages/artist/artist';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ProvidersModule,
    IonicStorageModule.forRoot(storageConfig),
    SharedModule
  ],
  declarations: [
    MyApp,
    LoginPage,
    LocationPage,
    ConcertDatesPage,
    ConcertsPage,
    ArtistPage,
    ConcertDetailPage
  ],
  entryComponents: [
    MyApp,
    LoginPage,
    LocationPage,
    ConcertDatesPage,
    ConcertsPage,
    ArtistPage,
    ConcertDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  bootstrap: [IonicApp]
})
export class AppModule {}
