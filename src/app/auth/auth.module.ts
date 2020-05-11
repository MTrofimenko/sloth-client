import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { authFeatureKey, reducer } from './auth.reducer';
import { AuthorizationTokenInterceptor } from './authorization-token.interceptor';
import { LoginComponent } from './components/login/login.component';
import { ForbiddenRedirectInterceptor } from './forbidden-redirect.interceptor';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forFeature(authFeatureKey, reducer),
        EffectsModule.forFeature([AuthEffects])
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthorizationTokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ForbiddenRedirectInterceptor, multi: true }
    ],
    bootstrap: []
})
export class AuthModule {}
