import { ChatSideBarComponent } from './../chat-side-bar/chat-side-bar.component';
import { ChatViewComponent } from './../chat-view/chat-view.component';
import { ChatListComponent } from './../chat-list/chat-list.component';
import { ChatLayoutComponent } from './../chat-layout/chat-layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
@NgModule({
  declarations: [
    AppComponent, ChatLayoutComponent, ChatListComponent, ChatViewComponent, ChatSideBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule, MatButtonModule, AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
