import {NgModule} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import {DataModelModule} from 'src/app/dataModels/DataModelModule';
import { ProfessorDashboardComponent } from './professor-dashboard.component';
import { HomeMainRoutes } from './home-main-routes';
import { TurmasModule } from './turmas/turmas-module';
import { InicioComponent } from './inicio/inicio.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
    imports : [DataModelModule, BrowserModule, HomeMainRoutes, ChartsModule, TurmasModule],
    declarations : [ProfessorDashboardComponent, InicioComponent],
    exports : [ProfessorDashboardComponent, InicioComponent]
})

export class HomeModuleProfDash {
}
