import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../auth/auth.reducer';
import { logout } from '../auth/auth.actions';

@Component({
  selector: 'chat-side-bar',
  templateUrl: './chat-side-bar.component.html',
  styleUrls: ['./chat-side-bar.component.scss']
})
export class ChatSideBarComponent {
  constructor(private store: Store<State>) { }

  logout() {
    this.store.dispatch(logout());
  }
}
