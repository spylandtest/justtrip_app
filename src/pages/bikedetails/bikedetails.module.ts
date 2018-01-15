import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BikedetailsPage } from './bikedetails';

@NgModule({
  declarations: [
    BikedetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BikedetailsPage),
  ],
})
export class BikedetailsPageModule {}
