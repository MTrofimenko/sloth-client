import { Component } from '@angular/core';

@Component({
    selector: 'chat-list-section',
    templateUrl: './chat-list-section.component.html'
})
export class ChatListSectionComponent {
    pendingChats = [
        {
            name: "Maria Mieshkova",
            lastMessage: "Glad to see you in our chat!",
            lastDate: "21 Aug",
            isCurrent: false,
            isPending: true
        },
        {
            name: "Marharyta Trofymenko",
            lastMessage: "Let's discuss it tomorrow!",
            lastDate: "21 Aug",
            isCurrent: false,
            isPending: true
        }
    ];
    activeChats = [
        {
            name: "Yurii Shevchuk",
            lastMessage: "Glad to see you in our chat!",
            lastDate: "2 Aug",
            isCurrent: true,
            isPending: false
        },
        {
            name: "Dr. Strange",
            lastMessage: "Glad to see you in our chat!",
            lastDate: "2 Aug",
            isCurrent: false,
            isPending: false
        }
    ];

    public acceptChat() {
        // TODO
    }
    
    public declineChat() {
        // TODO
    }
}