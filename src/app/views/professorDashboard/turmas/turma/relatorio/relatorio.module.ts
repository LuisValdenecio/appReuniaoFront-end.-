import { NgModule } from '@angular/core';
import { RelatorioComponent } from './relatorio.component';
import { BrowserModule } from "@angular/platform-browser";
import {RouterModule} from '@angular/router';
import { RelatoriocompletoComponent } from './relatoriocompleto/relatoriocompleto.component';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AngularSvgIconModule
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
