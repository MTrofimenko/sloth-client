import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, first, mergeMap } from 'rxjs/operators';
import {
  loadCurrentUserComplete,
  loadCurrentUserFailed,
  login,
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
          map((token) => loginComplete({ token })),
          catchError((error) => of(loginFailed({ error })))
        );
      })
    )
  );

  loadCurrentUser$ = createEffect(() =>
    this.authService.authToken.pipe(
      mergeMap(() => {
        return this.userService.current().pipe(
          map((user) => loadCurrentUserComplete({ user })),
          catchError((error) => of(loadCurrentUserFailed({ error })))
        );
      })
    )
  );

  redirectHomeAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginComplete),
      tap(() => {
        this.router.navigate([
          this.route.snapshot.queryParams.returnUrl || '/',
        ]);
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
