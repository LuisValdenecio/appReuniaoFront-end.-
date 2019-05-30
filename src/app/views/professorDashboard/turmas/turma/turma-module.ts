import {NgModule} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import {DataModelModule} from 'src/app/dataModels/DataModelModule';
import { TurmaComponent } from './turma.component';
import {RouterModule} from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { EstudantesComponent } from './estudantes/estudantes.component';
import { PautasComponent } from './pautas/pautas.component'
import { JustificativoComponent } from './justificativo/justificativo.component';
import { RelatorioModule } from './relatorio/relatorio.module';

@NgModule({
    imports : [
        BrowserModule, 
        DataModelModule, 
        ChartsModule, 
        RouterModule, 
        RelatorioModule
    ],
    declarations : [
        TurmaComponent, 
        EstudantesComponent, 
        PautasComponent, 
        JustificativoComponent
    ],
    exports : [
        TurmaComponent, 
        EstudantesComponent, 
        PautasComponent,  
        JustificativoComponent
    ]
})


export class TurmaModule {
}
