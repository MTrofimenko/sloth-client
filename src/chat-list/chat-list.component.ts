import { Component } from '@angular/core';

@Component({
  selector: 'chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  chats = [
    {
      name: "Maria Mieshkova",
      lastMessage:"Glad to see you in our chat!",
      lastDate: "21 Aug",
      isCurrent: false
    },
    {
      name: "Yurii Shevchuk",
      lastMessage:"Glad to see you in our chat!",
      lastDate: "2 Aug",
      isCurrent: true,
    },
    {
      name: "Marharyta Trofymenko",
      lastMessage:"Let's discuss it tomorrow!",
      lastDate: "21 Aug",
      isCurrent: false
    }
  ]
}