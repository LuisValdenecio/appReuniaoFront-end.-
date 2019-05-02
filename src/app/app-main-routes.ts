import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { SigninComponent } from './views/signin/signin.component';
import { ProfessorDashboardComponent } from './views/professorDashboard/professor-dashboard.component';

const appRoutes : Routes = [
    {path : 'login', component: LoginComponent},
    {path : 'signup', component: SigninComponent},
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
