import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ProfessorDashboardComponent } from './professor-dashboard.component';
import { TurmasComponent } from './turmas/turmas.component';
import { InicioComponent } from './inicio/inicio.component';
import { TurmaComponent } from './turmas/turma/turma.component';
import { EstudantesComponent } from './turmas/turma/estudantes/estudantes.component';
import { PautasComponent } from './turmas/turma/pautas/pautas.component';


const appRoutes : Routes = [
  {
      path : 'homeprof', 
      component : ProfessorDashboardComponent,
      children : [
        {
          path : 'turmas', 
          component: TurmasComponent,
          children : [
            {
              path : ':id',
              component : TurmaComponent,
              children : [
                {path : 'estudantes', component : EstudantesComponent},
                {path: 'pautas', component: PautasComponent}
              ]              
            }
          ] 
        },
        {path : 'inicio', component: InicioComponent}
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
