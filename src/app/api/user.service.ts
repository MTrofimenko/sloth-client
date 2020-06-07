import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../appsettings';
import { UserModel } from '../auth/auth.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  current() {
    return this.http.get<UserModel>(`${AppSettings.apiUrl}/api/user/current`);
  }

  getByName(namePart: string) {
    return this.http.get<UserModel[]>(`${AppSettings.apiUrl}/api/user`, {
      params: new HttpParams({
        fromObject: { namePart },
      }),
    });
  }

  constructor(private http: HttpClient) {}
}
