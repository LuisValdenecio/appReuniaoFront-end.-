import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-livro-de-ponto',
  templateUrl: './livro-de-ponto.component.html',
  styleUrls: ['./livro-de-ponto.component.css']
})
export class LivroDePontoComponent  {

  public _studentData : any[];
  public _thisClassSubjects : any[];
  public typeOfInput : any = {'inputType' : 'checkbox', 'class': ''};


  private thisClassesURL = window.location.href.split("/")[5]; // --> Substituição urgente (dependencia com o backend)
  private filteredAttribute : String = ""; // --> Substituição urgente (dependencia com o backend)


  constructor(private dataModelInterface : DataModelInterface) {

    this.dataModelInterface.getAllStudentsFromCLass("/"+this.formatURL()+"_students").subscribe(data=>{
      this._studentData = data;
    });
    
    this.dataModelInterface.getAllSubjects("/"+this.formatURL()).subscribe(data=>{
      this._thisClassSubjects = data.filter(data=> data['disciplina_nome'] != 'Avaliação Geral');
    });
  
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

  // --> Método utilizado para a marcação de faltas
  public marcarFaltas() {

    
  }

  public changeManual() {
    if (this.typeOfInput['inputType'] == "checkbox") {
      this.typeOfInput['inputType'] = "text"
      this.typeOfInput['class'] = "faltasInput"
    }
  }

  public changeCheckBox() {
    if (this.typeOfInput['inputType'] != "checkbox") {
      this.typeOfInput['inputType'] = "checkbox"
      this.typeOfInput['class'] = ""
    }
  }


}
