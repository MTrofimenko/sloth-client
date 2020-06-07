import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ChatListSectionComponent } from './chat-list-section/chat-list-section.component';
import { ChatEffects } from './chat-list-view.effects';
import { ChatsFeatureKey, reducer } from './chat-list-view.reducer';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatSearchInputComponent } from './chat-search-input/chat-search-input.component';
import { KeyStorageModule } from '../key-storage/key-storage.module';

@NgModule({
  declarations: [
    ChatSearchInputComponent,
    ChatListSectionComponent,
    ChatListComponent,
  ],
  exports: [ChatListSectionComponent, ChatSearchInputComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AngularFontAwesomeModule,
    KeyStorageModule,
    StoreModule.forFeature(ChatsFeatureKey, reducer),
    EffectsModule.forFeature([ChatEffects]),
  ],
})
export class ChatListViewModule {}
