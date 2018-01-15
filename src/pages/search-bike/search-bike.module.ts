import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchBikePage } from './search-bike';

@NgModule({
  declarations: [
    SearchBikePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchBikePage),
  ],
})
export class SearchBikePageModule {}
