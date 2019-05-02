import {NgModule} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import {DataModelModule} from 'src/app/dataModels/DataModelModule';
import { TurmaComponent } from './turma.component';
import {RouterModule} from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { EstudantesComponent } from './estudantes/estudantes.component';
import { PautasComponent } from './pautas/pautas.component'

@NgModule({
    imports : [BrowserModule, DataModelModule, ChartsModule, RouterModule],
    declarations : [TurmaComponent, EstudantesComponent, PautasComponent],
    exports : [TurmaComponent, EstudantesComponent, PautasComponent]
})


export class TurmaModule {
}
