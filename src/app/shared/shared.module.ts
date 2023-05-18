import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { PmMaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddToCartComponent } from './cart/add-to-cart/add-to-cart.component';
import { CartItemsCountComponent } from './cart/cart-items-count/cart-items-count.component';

@NgModule({
  declarations: [
    AddToCartComponent,
    CartItemsCountComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    PmMaterialModule
  ],
  exports: [
    PmMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CartItemsCountComponent,
    AddToCartComponent
  ]
})
export class SharedModule { }
