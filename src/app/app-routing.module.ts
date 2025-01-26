import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { LoginComponent } from './users/login/login.component';
import { CreateAccountComponent } from './users/create-account/create-account.component';
import { HomeComponent } from './component/home/home.component';
import { IncorectPathComponent } from './component/incorect-path/incorect-path.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
//lay aout route
  { path: '', component : LayoutComponent, children :[

    {path: 'home',component: HomeComponent }

  ]

    },
    {path: 'login',component: LoginComponent },
    {path: 'CreateAccount',component: CreateAccountComponent },
    {path: '**',component:IncorectPathComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
