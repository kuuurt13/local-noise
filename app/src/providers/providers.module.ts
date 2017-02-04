import { NgModule } from '@angular/core';

// Providers
import { Api } from './api';
import { LocationService } from './location.service';
import { ConcertService } from './concert.service';
import { SetlistService } from './setlist.service';
import { CredentialsService } from './credentials.service';
import { PlaylistService } from './playlist.service';


@NgModule({
  providers: [
    CredentialsService,
    Api,
    ConcertService,
    SetlistService,
    LocationService,
    PlaylistService
  ]
})
export class ProvidersModule {}
