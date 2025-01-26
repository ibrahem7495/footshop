import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { LoginComponent } from './layout/components/login/login.component';
import { CreateAccountComponent } from './layout/components/create-account/create-account.component';
import { IncorectPathComponent } from './layout/components/incorect-path/incorect-path.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    LoginComponent,
    CreateAccountComponent,
    IncorectPathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
