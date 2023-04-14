import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { throwIfAlreadyLoaded } from './utils/module-import-guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderIntercetporService } from './interceptors/auth-header-intercetpor.service';
import { SharedModule } from '../shared/shared.module';
import { ProductDataService } from './products/product-data.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
  
  providers: [
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthHeaderIntercetporService,
    multi:true
    },
    ProductDataService
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
