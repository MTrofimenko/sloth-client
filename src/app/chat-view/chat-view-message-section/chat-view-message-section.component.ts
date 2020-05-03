import { Component } from '@angular/core';

@Component({
    selector: 'chat-view-message-section',
    templateUrl: './chat-view-message-section.component.html',
    styleUrls: ['./chat-view-message-section.component.scss']
})
export class ChatViewMessageSectionComponent {
    messages = [
        {
            text: "Hi Ryta! What's Up?",
            sendDate: "14:26 PM",
            isMe: false
        },
        {
            text: "Oh hello! All perfectly. I do lot's of stuff.",
            sendDate: "14:36 PM",
            isMe: true
        },
        {
            text: "Could you possibly help me with homework?",
            sendDate: "14:37 PM",
            isMe: false
        },
        {
            text: "Sure. But maybe later.",
            sendDate: "15:00 PM",
            isMe: true
        },
    ]
}