import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuardService } from '@core/auth/auth-guard.service';

const routes: Routes = [
  // {
  //   path:'register',
  //   component: RegisterComponent
  // },
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'products'
  },
  {

  path: 'products',
  pathMatch: 'full',
  loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'cart',
    loadChildren: () => import('./cart/cart.module').then(m=>m.CartModule),
    canActivate : [AuthGuardService]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
