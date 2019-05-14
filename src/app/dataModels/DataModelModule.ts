import {NgModule} from '@angular/core';
import {GlobalDataStore} from './GlobalDataStore';
import {DataModelInterface} from './DataModelInterface';
import {LoginAuthService } from './login-auth.service';
import { AuthGuardService } from './auth-guard.service'

@NgModule({
    providers : [GlobalDataStore, DataModelInterface, LoginAuthService, AuthGuardService]
})

export class DataModelModule {}