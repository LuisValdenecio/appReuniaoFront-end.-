import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CursosComponent} from './cursos/cursos.component'
import { HomeComponent } from './home.component';
import { TurmasComponent } from './turmas/turmas.component';
import { InicioComponent } from './inicio/inicio.component';
import { TurmaComponent } from './turmas/turma/turma.component';
import { EstudantesComponent } from './turmas/turma/estudantes/estudantes.component';
import { ProfessoresComponent } from './turmas/turma/professores/professores.component';

const appRoutes : Routes = [
  {
      path : 'homeadmin', 
      component : HomeComponent,
      children : [
          {
            path : 'cursos',
            component : CursosComponent
          },
          {
            path : 'turmas', 
            component : TurmasComponent,
            children : [
              {
                path : ':id',
                component : TurmaComponent,
                children : [
                  {path : 'estudantes', component : EstudantesComponent},
                  {path : 'professores', component : ProfessoresComponent}
                ]
              }
            ]  
          },
          {
            path : 'inicio',
            component : InicioComponent
          }
      ]
    }
]

@NgModule({
    imports : [
        RouterModule.forChild(appRoutes)
    ],
    exports : [
        RouterModule
    ]
})


export class HomeMainRoutes {
}
