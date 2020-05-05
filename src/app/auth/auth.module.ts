import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthorizationTokenInterceptor } from './authorization-token.interceptor';
import { ForbiddenRedirectInterceptor } from './forbidden-redirect.interceptor';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule
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
