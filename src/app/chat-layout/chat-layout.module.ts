import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatLayoutComponent } from './chat-layout.component';
import { ChatViewModule } from '../chat-view/chat-view.module';
import { ChatListViewModule } from '../chat-list-view/chat-list-view.module';
import { ChatSideBarModule } from '../chat-side-bar/chat-side-bar.module';

@NgModule({
    declarations: [ChatLayoutComponent],
    exports: [ChatLayoutComponent],
    imports: [
        ChatViewModule,
        ChatListViewModule,
        ChatSideBarModule,
        AngularFontAwesomeModule
    ]
})
export class ChatLayoutModule { }
