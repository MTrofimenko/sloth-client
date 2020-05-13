import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'chat-message-input',
  templateUrl: './chat-message-input.component.html',
  styleUrls: ['./chat-message-input.component.scss'],
})
export class ChatMessageInputComponent {
  sendText: string;

  @Output() sendMessage = new EventEmitter<string>();

  onSendTextChange(sendText) {
    this.sendText = sendText;
  }

  onSendMessage() {
    this.sendMessage.emit(this.sendText);
    this.sendText = '';
  }
}
