import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../chat-list-view.reducer';
import { createChat } from '../chat-list-view.actions';

@Component({
  selector: 'chat-search-input',
  templateUrl: './chat-search-input.component.html',
  styleUrls: ['./chat-search-input.component.scss'],
})
export class ChatSearchInputComponent {
  constructor(private store: Store<State>) {}

  createChat() {
    // TODO: create separate component and do not hardcode members
    this.store.dispatch(createChat({name: '', memberIds: ['5EC81D22-289E-495F-034E-08D7F6AF7D4D'] })); // yurcco
  }
}
