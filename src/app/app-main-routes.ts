import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './views/login/login.component';

const appRoutes : Routes = [
    {path : 'login', component: LoginComponent},
    {path : 'homeadmin', redirectTo : 'homeadmin/inicio'},
    {path : 'homeprof', redirectTo: 'homeprof/inicio'},
    {path : '', redirectTo : 'login', pathMatch : 'full'}
]

@NgModule({
    imports : [
        RouterModule.forRoot(appRoutes)
    ],
    exports : [
        RouterModule
    ]
})

export class AppMainRoutes {}
