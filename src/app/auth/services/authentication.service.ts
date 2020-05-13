import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../../appsettings';
import { AuthToken } from '../auth-token.model';
import { Constants } from '../auth.constants';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authTokenSubject: BehaviorSubject<AuthToken>;
  public authToken: Observable<AuthToken>;

  constructor(private http: HttpClient) {
    this.authTokenSubject = new BehaviorSubject<AuthToken>(
      JSON.parse(localStorage.getItem(Constants.authToken))
    );
    this.authToken = this.authTokenSubject.asObservable();
  }

  public get authTokenValue(): AuthToken {
    return this.authTokenSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthToken>(`${AppSettings.apiUrl}/api/auth/login`, {
        login: username,
        password,
      })
      .pipe(
        map((authToken) => {
          localStorage.setItem(Constants.authToken, JSON.stringify(authToken));
          this.authTokenSubject.next(authToken);
          return authToken;
        })
      );
  }

  logout() {
    localStorage.removeItem(Constants.authToken);
    this.authTokenSubject.next(null);
  }
}
