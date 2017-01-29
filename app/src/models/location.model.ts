export class LocationModel {
  public id: number;
  public displayName: string;
  public city: string;
  public state: string;
  public country: string;
  public lat: number;
  public lng: number;

  constructor(location: any = {}) {
    this.id = location.id;
    this.city = location.displayName;
    this.state = location.state.displayName;
    this.country = location.country.displayName;
    this.lat = location.lat;
    this.lng = location.lng;

    this.displayName = this.getDisplayName();
  }

  private getDisplayName(): string {
    return `${this.city}, ${this.state}`;
  }
}
