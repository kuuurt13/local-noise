import { Component, Input, OnInit } from '@angular/core';
import { ArtistImage } from '../artist-image';
import { Api } from '../../../providers/api';

@Component({
  selector: 'artist-image',
  templateUrl: 'artist-image.html'
})
export class ArtistImageComponent extends ArtistImage implements OnInit {
  @Input() artist: any = {};
  @Input() size: string = 'md';
  artistImageUrl: string;

  constructor(public api: Api) {
    super(api);
  }

  ngOnInit() {
    this.artistImageUrl = this.getArtistImageURL(this.artist || {}, this.size);
  }

  onLoad(imgRef: Element) {
    imgRef.classList.add('active');
  }
}
