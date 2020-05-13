import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent {
  @Input() chats;

  @Output() acceptChat = new EventEmitter();
  @Output() declineChat = new EventEmitter();
  @Output() selectChat = new EventEmitter<string>();

  public onSelectChat(chatId: string) {
    this.selectChat.emit(chatId);
  }

  public onAcceptChat($event, chatId) {
    this.acceptChat.emit(chatId);
    $event.stopPropagation();
  }

  public onDeclineChat($event, chatId) {
    this.declineChat.emit(chatId);
    $event.stopPropagation();
  }
}
