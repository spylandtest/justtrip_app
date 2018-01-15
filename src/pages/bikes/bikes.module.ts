import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikesPage } from './bikes';

@NgModule({
  declarations: [
    BikesPage,
  ],
  imports: [
    IonicPageModule.forChild(BikesPage),
  ],
})
export class BikesPageModule {}
