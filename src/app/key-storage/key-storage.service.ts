import { Injectable } from '@angular/core';
import { KeyPair } from './key-pair.model';

@Injectable()
export abstract class KeyStorageService {
  abstract getKeyPairByChatId(chatId: string): KeyPair;
  abstract getSecretKeyByChatId(chatId: string): string;
  abstract setKeyPairByChatId(chatId: string, keyPair: KeyPair): void;
  abstract removeKeyPairByChatId(chatId: string): void;
}
