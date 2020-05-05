import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatSearchInputComponent } from './chat-search-input/chat-search-input.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatListSectionComponent } from './chat-list-section/chat-list-section.component';

@NgModule({
    declarations: [
        ChatSearchInputComponent,
        ChatListSectionComponent,
        ChatListComponent
    ],
    exports: [ChatListSectionComponent, ChatSearchInputComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        AngularFontAwesomeModule
    ]
})
export class ChatListViewModule { }
