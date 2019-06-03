import { NgModule } from '@angular/core';
import { RelatorioComponent } from './relatorio.component';
import { BrowserModule } from "@angular/platform-browser";
import {RouterModule} from '@angular/router';
import { RelatoriocompletoComponent } from './relatoriocompleto/relatoriocompleto.component';
import { ChartsModule } from 'ng2-charts';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AngularSvgIconModule,
    ChartsModule
  ],
  declarations: [
    RelatorioComponent, 
    RelatoriocompletoComponent
  ],
  exports : [
    RelatorioComponent,
    RelatoriocompletoComponent
  ]
})
export class RelatorioModule { }
