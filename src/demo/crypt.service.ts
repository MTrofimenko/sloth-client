import * as nacl from 'tweetnacl';
import * as util from 'tweetnacl-util';

const bob = nacl.box.keyPair();
const alice = nacl.box.keyPair();
const nonce = nacl.randomBytes(24);

class Package {
  encodedStr: string;
  nonce: Uint8Array;
}

export function SendMessage(message: string, isBob: boolean): Package {
  const pubKey = isBob ? alice.publicKey : bob.publicKey;
  const secKey = isBob ? bob.secretKey : alice.secretKey;

  const box = nacl.box(util.decodeUTF8(message), nonce, pubKey, secKey);

  const encodedStr = util.encodeBase64(box);
  return { encodedStr, nonce };
}

export function GetMessage(encodedStr: string, isBob: boolean): string {
  const pubKey = isBob ? alice.publicKey : bob.publicKey;
  const secKey = isBob ? bob.secretKey : alice.secretKey;

  const box = util.decodeBase64(encodedStr);

  const payload = nacl.box.open(
    box,
    nonce,
    pubKey,
    secKey
  );
  const utf8 = util.encodeUTF8(payload);

  return utf8;
}
