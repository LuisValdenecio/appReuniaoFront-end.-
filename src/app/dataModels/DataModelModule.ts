import {NgModule} from '@angular/core';
import {GlobalDataStore} from './GlobalDataStore';
import {DataModelInterface} from './DataModelInterface';
import {LoginAuthService } from './login-auth.service';

@NgModule({
    providers : [GlobalDataStore, DataModelInterface, LoginAuthService]
})

export class DataModelModule {}