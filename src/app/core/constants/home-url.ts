import { environment } from '../../../environments/environment';

export class HomeUrl {
  public static get HOME_URL(): string {
    return environment.baseUrl;
  }
}
