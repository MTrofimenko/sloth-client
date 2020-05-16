import * as nacl from 'tweetnacl';
import * as util from 'tweetnacl-util';
import { Injectable } from '@angular/core';
import { KeyPair } from '../key-storage/key-pair.model';

const nonce = new Uint8Array(24);

@Injectable({
  providedIn: 'root',
})
export class CryptService {
  constructor() {}

  createKeyPair(): KeyPair {
    const box = nacl.box.keyPair();
    return {
      publicKey: util.encodeBase64(box.publicKey),
      secretKey: util.encodeBase64(box.secretKey),
    };
  }

  encryptMessage(
    message: string,
    recipientPublicKey: string,
    senderSecretKey: string
  ) {
    const box = nacl.box(
      util.decodeUTF8(message),
      nonce,
      util.decodeBase64(recipientPublicKey),
      util.decodeBase64(senderSecretKey)
    );
    const encodedStr = util.encodeBase64(box);

    return encodedStr;
  }

  decryptMessage(
    encodedMessage: string,
    senderPublicKey: string,
    recipientSecretKey: string
  ): string {
    const box = util.decodeBase64(encodedMessage);
    const payload = nacl.box.open(
      box,
      nonce,
      util.decodeBase64(senderPublicKey),
      util.decodeBase64(recipientSecretKey)
    );
    const utf8 = util.encodeUTF8(payload);

    return utf8;
  }
}
