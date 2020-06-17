import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ChatSearchInputComponent } from './chat-search-input.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { reducer, SearchedUsersFeatureKey } from './chat-search.reducer';
import { SearchedUsersEffects } from './chat-search.effects';

@NgModule({
  declarations: [ChatSearchInputComponent],
  exports: [ChatSearchInputComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AngularFontAwesomeModule,
    StoreModule.forFeature(SearchedUsersFeatureKey, reducer),
    EffectsModule.forFeature([SearchedUsersEffects]),
    AutocompleteLibModule,
  ],
})
export class ChatSearchModule {}
