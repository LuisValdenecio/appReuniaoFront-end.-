import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-pautas',
  templateUrl: './pautas.component.html',
  styleUrls: ['./pautas.component.css']
})
export class PautasComponent  {

  public _studentData : any[];
  public _thisClassSubjects : any[];
  public thisClassGrade : String;
  public tipoDePauta : String;

  private thisClassesURL = window.location.href.split("/")[5]; // --> Substituição urgente (dependencia com o backend)
  private filteredAttribute : String = ""; // --> Substituição urgente (dependencia com o backend)

  constructor(private dataModelInterface : DataModelInterface) {

    this.dataModelInterface.getAllStudents().subscribe(data=>{
      this._studentData = data.filter(turma=> turma['turma_id'] == this.formatURL())
    });

    this.dataModelInterface.getAllSubjects("/"+this.formatURL()).subscribe(data=>{
      this._thisClassSubjects = data;
    });

    // -->> determina qual modal mostrar para cada estudante
    this.dataModelInterface.getClassGrade("/"+this.formatURL()+"_classe").subscribe(data=>{
      this.thisClassGrade = data;

      if (data[0]['nome_class'] == 'Iniciação' || data[0]['nome_class'] == '1ª Classe' || 
        this.thisClassGrade[0]['nome_class'] == '2ª Classe' || data[0]['nome_class'] == '3ª Classe'
        || data[0]['nome_class'] == '4ª Classe') {
          this.tipoDePauta = "primario";
        } else {
          this.tipoDePauta = "naoPrimario";
      }


    });

    // -->> condição que determina o tipo de minipauta a mostrar no template
    

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
