import { NgModule } from '@angular/core';
import { KeyStorageService } from './key-storage.service';
import { KeyLocalStorageService } from './key-localstorage.service';

@NgModule({
  providers: [
    { provide: KeyStorageService, useClass: KeyLocalStorageService }
  ]
})
export class KeyStorageModule { }
