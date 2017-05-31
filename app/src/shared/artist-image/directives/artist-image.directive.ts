import { Directive, AfterViewInit, Input, ElementRef } from '@angular/core';
import { ArtistImage } from '../artist-image';
import { Api } from '../../../providers/api';

@Directive({ selector: '[artistImage]' })
export class ArtistImageDirective extends ArtistImage implements AfterViewInit {
  @Input('artistImage') artist: any = {};

  constructor(
    public api: Api,
    public el: ElementRef
  ) {
    super(api);
  }

  ngAfterViewInit() {
    const { nativeElement } = this.el;
    const artistImage = this.getArtistImageURL(this.artist, 'lg');

    nativeElement.style.background = `url("${artistImage}")`;
  }

}