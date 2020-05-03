import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChatSideBarComponent } from './chat-side-bar.component';

@NgModule({
    declarations: [ChatSideBarComponent],
    exports: [ChatSideBarComponent],
    imports: [AngularFontAwesomeModule]
})
export class ChatSideBarModule { }
