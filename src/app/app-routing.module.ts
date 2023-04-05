import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  // {
  //   path:'register',
  //   component: RegisterComponent
  // },
  {
    path:'',
    pathMatch:'full',
    redirectTo: 'Home'
  },
  {
    path:'Home',
    pathMatch:'full',
    component: HomeComponent,
  },
  {

  path: 'products',
  pathMatch: 'full',
  loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
