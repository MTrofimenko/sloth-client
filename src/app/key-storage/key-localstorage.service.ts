import { Injectable } from '@angular/core';
import { KeyPair } from './key-pair.model';
import { KeyStorageService } from './key-storage.service';

@Injectable()
export class KeyLocalStorageService implements KeyStorageService {
  chatPublicKey = 'chat-p-key';
  chatSecretKey = 'chat-s-key';

  constructor() {}

  getKeyPairByChatId(chatId: string): KeyPair {
    const publicKey = localStorage.getItem(`${this.chatPublicKey}-${chatId}`);
    const secretKey = localStorage.getItem(`${this.chatSecretKey}-${chatId}`);

    return { publicKey, secretKey };
  }

  getSecretKeyByChatId(chatId: string): string {
    const secretKey = localStorage.getItem(`${this.chatSecretKey}-${chatId}`);
    return secretKey;
  }

  setKeyPairByChatId(chatId: string, keyPair: KeyPair) {
    localStorage.setItem(`${this.chatPublicKey}-${chatId}`, keyPair.publicKey);
    localStorage.setItem(`${this.chatSecretKey}-${chatId}`, keyPair.secretKey);
  }

  removeKeyPairByChatId(chatId: string) {
    localStorage.removeItem(`${this.chatPublicKey}-${chatId}`);
    localStorage.removeItem(`${this.chatSecretKey}-${chatId}`);
  }
}
