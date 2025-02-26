import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { CreateAccountComponent } from './users/create-account/create-account.component';
import { IncorectPathComponent } from './component/incorect-path/incorect-path.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './users/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './users/auth/interseptor/auth.interceptor';
import { ShopComponent } from './component/shop/shop.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { EditProductComponent } from './component/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    CreateAccountComponent,
    IncorectPathComponent,
    LoginComponent,
    ShopComponent,
    EditProfileComponent,
    EditProductComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
