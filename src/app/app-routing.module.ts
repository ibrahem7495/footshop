import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { LoginComponent } from './users/login/login.component';
import { CreateAccountComponent } from './users/create-account/create-account.component';
import { HomeComponent } from './component/home/home.component';
import { IncorectPathComponent } from './component/incorect-path/incorect-path.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { ShopComponent } from './component/shop/shop.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  //lay aout route
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {path:'shop',component:ShopComponent}
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'CreateAccount', component: CreateAccountComponent },
  { path: 'EditProfile', component: EditProfileComponent },
  { path: 'EditProduct', component: EditProductComponent },

  { path: '**', component: IncorectPathComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
