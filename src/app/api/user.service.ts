import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../auth/auth.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  current() {
    return this.http.get<UserModel>(`${environment.apiUrl}/api/user/current`);
  }

  getByName(namePart: string) {
    return this.http.get<UserModel[]>(`${environment.apiUrl}/api/user`, {
      params: new HttpParams({
        fromObject: { namePart },
      }),
    });
  }

  constructor(private http: HttpClient) {}
}
