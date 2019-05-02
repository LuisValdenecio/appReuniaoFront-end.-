import {NgModule} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import {DataModelModule} from 'src/app/dataModels/DataModelModule';
import {SigninComponent} from './signin.component';
import {AppMainRoutes} from 'C:/Users/casa/Documents/Eu/appReunioes/appReunioes/src/app/app-main-routes'

@NgModule({
    imports : [DataModelModule, BrowserModule, AppMainRoutes],
    declarations : [SigninComponent],
    exports : [SigninComponent]
})

export class SignupModule {
}
