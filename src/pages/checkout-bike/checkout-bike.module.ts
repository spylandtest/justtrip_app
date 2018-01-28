import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutBikePage } from './checkout-bike';

@NgModule({
  declarations: [
    CheckoutBikePage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutBikePage),
  ],
})
export class CheckoutBikePageModule {}
