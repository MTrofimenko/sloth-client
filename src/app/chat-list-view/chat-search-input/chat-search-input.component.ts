import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../chat-list-view.reducer';
import { selectAllUsers } from './chat-search.selectors';
import { searchUsers, selectUser } from './chat-search.actions';

@Component({
  selector: 'chat-search-input',
  templateUrl: './chat-search-input.component.html'
})
export class ChatSearchInputComponent {
  constructor(private store: Store<State>) {}

  data$ = this.store.select(selectAllUsers);

  keyword = 'login';

  selectEvent(user) {
   this.store.dispatch(selectUser({user}));
  }

  onChangeSearch(val: string) {
    this.store.dispatch(searchUsers({namePart: val}));
  }
}
