import { Api } from '../../providers/api';

export class ArtistImage {

  constructor(
    public api: Api
  ) {}

  protected getArtistImageURL(artist: any, size: string): string {
    const { artistsUrl } = this.api;
    const { id } = artist;

    if (id) {
      return `${artistsUrl}/${id}/image?size=${size}`;
    } else {
      return 'assets/images/no-image.png';
    }
  }
}
