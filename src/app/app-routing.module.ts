import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { LoginComponent } from './layout/components/login/login.component';
import { CreateAccountComponent } from './layout/components/create-account/create-account.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
//lay aout route
  { path: '', component : LayoutComponent, children :[
    {path: 'login',component: LoginComponent },
    {path: 'CreateAccount',component: CreateAccountComponent },
    {path: 'home',component: HomeComponent }

  ]

    }
    // {path: '**',component:IncorectPathComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
