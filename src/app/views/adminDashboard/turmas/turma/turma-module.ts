import {NgModule} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import {DataModelModule} from 'src/app/dataModels/DataModelModule';
import { TurmaComponent } from './turma.component';
import {RouterModule} from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { EstudantesComponent } from './estudantes/estudantes.component';
import { ProfessoresComponent } from './professores/professores.component';
import { StudentDataUtils } from './estudantes/UtilityClasses/studentsDataUtilMethods'
import { LivroDePontoComponent } from './livro-de-ponto/livro-de-ponto.component';
import { PautasComponent } from './pautas/pautas.component';


@NgModule({
    imports : [BrowserModule, DataModelModule, ChartsModule, RouterModule],
    providers : [ StudentDataUtils ],
    declarations : [TurmaComponent, EstudantesComponent, ProfessoresComponent, LivroDePontoComponent, PautasComponent],
    exports : [TurmaComponent, EstudantesComponent, ProfessoresComponent, LivroDePontoComponent, PautasComponent]
})

export class TurmaModule {
}
