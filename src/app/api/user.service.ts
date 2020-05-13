import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../appsettings';
import { CurrentUser } from '../auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  current() {
    return this.http.get<CurrentUser>(
      `${AppSettings.apiUrl}/api/user/current`
    );
  }

  constructor(
    private http: HttpClient
  ) {}
}
