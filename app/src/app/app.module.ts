import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

// Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';

//App
import { MyApp } from './app.component';

// Config
import storageConfig from '../config/storage.config';

// Providers
import { ProvidersModule } from '../providers/providers.module';

// Pages
import { LoginPage } from '../pages/login/login';
import { LocationPage } from '../pages/location/location';
import { ConcertDatesPage } from '../pages/concert-dates/concert-dates';
import { ConcertsPage } from '../pages/concerts/concerts';
import { ConcertDetailPage } from '../pages/concert-detail/concert-detail';
import { ArtistPage } from '../pages/artist/artist';

// Components
import { ArtistImageComponent } from '../components/artist-image/artist-image';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ProvidersModule,
    IonicStorageModule.forRoot(storageConfig)
  ],
  declarations: [
    MyApp,
    LoginPage,
    LocationPage,
    ConcertDatesPage,
    ConcertsPage,
    ArtistPage,
    ArtistImageComponent,
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
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  bootstrap: [IonicApp]
})
export class AppModule {}
