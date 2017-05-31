import { NgModule } from '@angular/core';

import { Api } from '../providers/api';
import { ArtistImageDirective } from './artist-image/directives/artist-image.directive';
import { ArtistImageComponent } from './artist-image/components/artist-image.component';

@NgModule({
  exports: [
    ArtistImageDirective,
    ArtistImageComponent
  ],
  declarations: [
    ArtistImageDirective,
    ArtistImageComponent
  ],
  providers: [ Api ]
})
export class SharedModule { }
