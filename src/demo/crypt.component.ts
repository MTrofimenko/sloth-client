import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
} from '@angular/core';
import { SendMessage, GetMessage } from './crypt.service';

@Component({
  selector: 'app-crypt',
  templateUrl: './crypt.component.html',
  styleUrls: ['./crypt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptComponent {
  aliceMsg: string;
  bobMsg: string;

  aliceEncMsg: string;
  bobEncMsg: string;

  aliceGetMsg: string;
  bobGetMsg: string;

  aliceGetEncMsg: string;
  bobGetEncMsg: string;

  sendMessage(isBob: boolean) {
    const msg = isBob ? this.bobMsg : this.aliceMsg;
    const encMsg = SendMessage(msg, isBob);

    if (isBob) {
      this.bobEncMsg = encMsg.encodedStr;
    } else {
      this.aliceEncMsg = encMsg.encodedStr;
    }
  }

  getMessage(isBob: boolean) {
    const msg = isBob ? this.bobGetMsg : this.aliceGetMsg;
    const encMsg = GetMessage(msg, isBob);

    if (isBob) {
      this.bobGetEncMsg = encMsg;
    } else {
      this.aliceGetEncMsg = encMsg;
    }
  }
}
