import { Component, Input } from '@angular/core';
import { ChatMessage } from '../../api/models/chat-message.model';

@Component({
    selector: 'chat-view-message-section',
    templateUrl: './chat-view-message-section.component.html',
    styleUrls: ['./chat-view-message-section.component.scss']
})
export class ChatViewMessageSectionComponent {
  @Input() messages: ChatMessage[];
  @Input() currentUserId: string;
}
