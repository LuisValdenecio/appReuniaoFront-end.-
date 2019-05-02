import {NgModule} from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import {DataModelModule} from 'src/app/dataModels/DataModelModule';
import {RouterModule} from '@angular/router';
import { TurmasComponent } from './turmas.component';
import { TurmaModule } from './turma/turma-module';

@NgModule({
    imports : [DataModelModule, BrowserModule, RouterModule, TurmaModule],
    declarations : [TurmasComponent],
    exports : [TurmasComponent]
})


export class TurmasModule {
}
