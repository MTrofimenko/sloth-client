import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
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
  logout,
  loginFailed,
  loginComplete,
} from './auth.actions';
import { UserService } from '../api/user.service';
import { AuthenticationService } from './services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
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
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
