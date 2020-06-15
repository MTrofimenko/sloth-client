import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { LogonComponent } from './auth/components/logon/logon.component';
import { AuthNavigateComponent } from './auth/components/auth-navigate/auth-navigate.component';

const routes: Routes = [
  { path: '', component: ChatLayoutComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthNavigateComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
