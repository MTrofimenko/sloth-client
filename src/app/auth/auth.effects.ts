import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { UserService } from '../api/user.service';
import { KeyStorageService } from '../key-storage/key-storage.service';
import { AuthenticationService } from './services/authentication.service';
import {
  catchError,
  map,
  switchMap,
  tap,
  first,
  mergeMap,
  filter,
} from 'rxjs/operators';
import {
  loadCurrentUserComplete,
  loadCurrentUserFailed,
  login,
  logon,
  logout,
  loginFailed,
  logonFailed,
  loginComplete,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ userName, password }) => {
        return this.authService.login(userName, password).pipe(
          first(),
          map((token) => {
            this.router.navigate([
              this.route.snapshot.queryParams.returnUrl || '/',
            ]);
            return loginComplete({ token });
          }),
          catchError((error) => of(loginFailed({ error })))
        );
      })
    )
  );

  logon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logon),
      switchMap(({ registerModel }) => {
        return this.authService.logon(registerModel).pipe(
          map((userId) => {
            return login({ userName: registerModel.login, password: registerModel.password });
          }),
          catchError((error) => of(logonFailed({ error })))
        );
      })
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.keyStorageService.removeAll();
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
  loadCurrentUser$ = createEffect(() =>
    this.authService.authToken.pipe(
      filter((x) => !!x),
      mergeMap(() => {
        return this.userService.current().pipe(
          map((user) => loadCurrentUserComplete({ user })),
          catchError((error) => of(loadCurrentUserFailed({ error })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private authService: AuthenticationService,
    private keyStorageService: KeyStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
