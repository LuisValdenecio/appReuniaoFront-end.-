import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent {

  private turmas : any[];
  public display : Boolean = true; // --> isto é somente um hack para fazer desaparecer o view da turma

  constructor(private dataModelInterface : DataModelInterface) {
    this.dataModelInterface.getAllClasses().subscribe(data=>{
      this.turmas = data;
    });
   }

   // --> isto é somente um hack para fazer desaparecer o view da turma
   public deleteParentView() {
     this.display = false;
   }


}
