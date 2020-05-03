import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatButtonModule } from '@angular/material/button';
import { ChatViewComponent } from './chat-view.component';
import { ChatViewMessageSectionComponent } from './chat-view-message-section/chat-view-message-section.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatViewContactSectionComponent } from './chat-view-contact-section/chat-view-contact-section.component';
import { ChatMessageInputComponent } from './chat-message-input/chat-message-input.component';

@NgModule({
    declarations: [
        ChatViewMessageSectionComponent,
        ChatViewContactSectionComponent,
        ChatMessageInputComponent,
        ChatViewComponent
    ],
    exports: [ChatViewComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        AngularFontAwesomeModule
    ]
})
export class ChatViewModule { }
