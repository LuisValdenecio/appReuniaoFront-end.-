import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppComponent } from './app.component';
import {AppMainRoutes} from './app-main-routes';
import { LoginModule } from './views/login/login-module';
import { HomeModule} from './views/adminDashboard/home-module';
import { HomeModuleProfDash} from './views/professorDashboard/home-module';
import { AppSelectDisabledDirective } from './views/professorDashboard/turmas/turma/custom_directives/app-select-disabled.directive';


@NgModule({
  declarations: [
    AppComponent,
    AppSelectDisabledDirective
  ],
  imports: [
    BrowserModule,
    AppMainRoutes,
    LoginModule,
    HttpClientModule,
    AngularSvgIconModule,
    HomeModule,
    HomeModuleProfDash
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
