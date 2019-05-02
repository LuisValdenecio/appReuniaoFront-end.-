import {NgModule} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import {DataModelModule} from 'src/app/dataModels/DataModelModule';
import {AppMainRoutes} from 'C:/Users/casa/Documents/Eu/appReunioes/appReunioes/src/app/app-main-routes'
import {LoginComponent} from './login.component';


@NgModule({
    imports : [DataModelModule, BrowserModule, AppMainRoutes],
    declarations : [LoginComponent],
    exports : [LoginComponent]
})

export class LoginModule {
}
