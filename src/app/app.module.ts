import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {AppMainRoutes} from './app-main-routes';
import { LoginModule } from './views/login/login-module';
import { SignupModule } from './views/signin/signup-module';
import { HomeModule} from './views/adminDashboard/home-module';
import { HomeModuleProfDash} from './views/professorDashboard/home-module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppMainRoutes,
    LoginModule,
    SignupModule,
    HttpClientModule,
    HomeModule,
    HomeModuleProfDash
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
