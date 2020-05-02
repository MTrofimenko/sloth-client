import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  @Input() chats;

  @Output() acceptChat = new EventEmitter();
  @Output() declineChat = new EventEmitter();


  public onAcceptChat() {
    this.acceptChat.emit();
  }

  public onDeclineChat() {
    this.declineChat.emit();
  }
}