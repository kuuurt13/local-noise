export class LoginCredentialsModel {
  public token: string;
  public refresh: string;
  public id: string;

  constructor(creds: any = {}) {
    this.token = creds.token;
    this.refresh = creds.refresh;
    this.id = creds.id;
  }

  public isDefined(): boolean {
    return !!(this.token && this.refresh && this.id);
  }

  public parse(url: string): LoginCredentialsModel {
    let params: string | string[];
    let splitUrl: string[];
    let loginCredentials: any = {};

    if (url && url.indexOf('?') > -1) {
      splitUrl = url.split('?')[1].split('&');

      loginCredentials = splitUrl.reduce((prev, cur) => {
        params = cur.split('=');
        prev[params[0]] = params[1];
        return prev;
      }, {});
    }

    return new LoginCredentialsModel(loginCredentials);
  }
}
