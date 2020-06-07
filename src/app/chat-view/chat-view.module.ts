import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ChatMessageInputComponent } from './chat-message-input/chat-message-input.component';
import { ChatViewContactSectionComponent } from './chat-view-contact-section/chat-view-contact-section.component';
import { ChatViewMessageSectionComponent } from './chat-view-message-section/chat-view-message-section.component';
import { ChatViewComponent } from './chat-view.component';
import { ChatMessagesEffects } from './chat-view.effects';
import { ChatMessagesFeatureKey, reducer } from './chat-view.reducer';
import { FormsModule } from '@angular/forms';
import { KeyStorageModule } from '../key-storage/key-storage.module';

@NgModule({
  declarations: [
    ChatViewMessageSectionComponent,
    ChatViewContactSectionComponent,
    ChatMessageInputComponent,
    ChatViewComponent,
  ],
  exports: [ChatViewComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AngularFontAwesomeModule,
    FormsModule,
    KeyStorageModule,
    StoreModule.forFeature(ChatMessagesFeatureKey, reducer),
    EffectsModule.forFeature([ChatMessagesEffects]),
  ],
})
export class ChatViewModule {}
