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

  // --> Substituição urgente (dependencia com o backend)
  public newestURL : String = "";

  constructor(private dataModelInterface : DataModelInterface) {
    this.dataModelInterface.getAllClasses().subscribe(data=>{
      this.turmas = data;    
    });
   }

   // --> isto é somente um hack para fazer desaparecer o view da turma
   public deleteParentView() {
     this.display = false;
   }

   // --> a implementação deste método precisa de substituição urgente (dependencia com o backend)
   public urlFriendlyFormat(url : String) {
      this.newestURL = "";
      for (let counter = 0; counter < url.length; counter++) {
        if (url.charAt(counter) != '-') {
          this.newestURL += url.charAt(counter);
        }
      }   
      return this.newestURL;
   }

}
