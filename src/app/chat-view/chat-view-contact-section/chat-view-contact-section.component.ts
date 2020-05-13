import { Component, Input } from '@angular/core';
import { Chat } from '../../api/models/chat.model';

@Component({
  selector: 'chat-view-contact-section',
  templateUrl: './chat-view-contact-section.component.html',
  styleUrls: ['./chat-view-contact-section.component.scss'],
})
export class ChatViewContactSectionComponent {
  @Input() chat: Chat;
}
