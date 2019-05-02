import {NgModule} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import {DataModelModule} from 'src/app/dataModels/DataModelModule';
import { HomeComponent } from './home.component';
import { HomeMainRoutes } from './home-main-routes';
import {CursosComponent} from './cursos/cursos.component';
import { InicioComponent } from './inicio/inicio.component';
import { ChartsModule } from 'ng2-charts';
import { TurmasModule } from './turmas/tumas-module';


@NgModule({
    imports : [DataModelModule, BrowserModule, HomeMainRoutes, ChartsModule, TurmasModule],
    declarations : [HomeComponent, CursosComponent, InicioComponent],
    exports : [HomeComponent, CursosComponent, InicioComponent]
})

export class HomeModule {
}
