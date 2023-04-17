import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatNavList } from '@angular/material/list';
import { BlocksRoutingModule } from './blocks-routing.module';
// import { HeaderComponent } from './header/header.component';
import { PmMaterialModule } from '../shared/material-module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BlocksRoutingModule,
    PmMaterialModule,
    
  ]
})
export class BlocksModule { }
