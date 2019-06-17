import { Component} from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';


@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent  {
 
  public display : Boolean = true; // --> isto é somente um hack para fazer desaparecer o view da turma
  public isThisTeacherCoor : Boolean = false;

  private thisClassesURL : any;

  private filteredAttribute : String = ""; // --> Substituição urgente (dependencia com o backend)

  constructor(private dataInterface : DataModelInterface) {

    // esta condição é muito importante antes de inserir setar o valor do thisClassesURL 
    if (window.location.href.split("/")[5] != undefined && window.location.href.split("/")[5].length == 32) {
      this.thisClassesURL = window.location.href.split("/")[5];
    } else if (window.location.href.split("/")[14] != undefined && window.location.href.split("/")[14].length == 32) {
      this.thisClassesURL = window.location.href.split("/")[14];
    }  else if (window.location.href.split("/")[17] != undefined && window.location.href.split("/")[17].length == 32) {
      this.thisClassesURL = window.location.href.split("/")[17];
    }

    this.dataInterface.isThisTeacherCood("/"+this.formatURL()+"_"+this.dataInterface.parseJwt(this.dataInterface.getToken())['codUser']+"_coord").subscribe(data=>{
      this.isThisTeacherCoor = data > 0;
    }) 
  }

  // --> isto é somente um hack para fazer desaparecer o view da turma
  public deleteParentView() {
    this.display = false;
  }
  
  // --> Substituição urgente (dependencia com o backend)
  public formatURL() {

    this.filteredAttribute = "";

    for (let counter = 0; counter < this.thisClassesURL.length; counter++) {
      this.filteredAttribute += this.thisClassesURL.charAt(counter);
      if (counter == 7 || counter == 11 || counter == 15 || counter == 19) {
        this.filteredAttribute += "-"
      }
    }
    return this.filteredAttribute;
    
  }

 

}
