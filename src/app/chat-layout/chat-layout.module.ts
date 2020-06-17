import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { ChatLayoutComponent } from './chat-layout.component';
import { ChatViewModule } from '../chat-view/chat-view.module';
import { ChatListViewModule } from '../chat-list-view/chat-list-view.module';
import { ChatSideBarModule } from '../chat-side-bar/chat-side-bar.module';
import { ChatSearchModule } from '../chat-list-view/chat-search-input/chat-search.module';

@NgModule({
    declarations: [ChatLayoutComponent],
    exports: [ChatLayoutComponent],
    imports: [
        ChatViewModule,
        ChatListViewModule,
        ChatSideBarModule,
        ChatSearchModule,
        AngularFontAwesomeModule
    ]
})
export class ChatLayoutModule { }
