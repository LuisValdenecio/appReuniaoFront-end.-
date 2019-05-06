import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent  {

  private shouldDisplayFirstModal : Boolean = false;
  private shouldDisplaySecondModal : Boolean = false;
  private studentData : any[];
  private thisClassesURL = window.location.href.split("/")[5]; // --> Substituição urgente (dependencia com o backend)
  public studentDisplayed : any;

  public thisClassGrade : String;

  private filteredAttribute : String = ""; // --> Substituição urgente (dependencia com o backend)

  constructor(private dataModelInterface : DataModelInterface) {
    this.dataModelInterface.getAllStudents().subscribe(data=>{
      this.studentData = data.filter(turma=> turma['turma_id'] == this.formatURL())
      
      // -->> determina qual modal mostrar para cada estudante
      this.dataModelInterface.getClassGrade("/"+this.formatURL()+"_classe").subscribe(data=>{
        this.thisClassGrade = data;
        console.log(this.thisClassGrade);
      })



      this.studentDisplayed = data[0];
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

  public openModal(index : number) {

    if (this.thisClassGrade[0]['nome_class'] == 'Iniciação' || this.thisClassGrade[0]['nome_class'] == '1ª Classe' || 
    this.thisClassGrade[0]['nome_class'] == '2ª Classe' || this.thisClassGrade[0]['nome_class'] == '3ª Classe'
     || this.thisClassGrade[0]['nome_class'] == '4ª Classe') {
      this.shouldDisplayFirstModal = true;
    } else {
      this.shouldDisplaySecondModal = true;
    }

    this.studentDisplayed = this.studentData[index];
    
  }

  public closeModal() {
    this.shouldDisplayFirstModal = false;
    this.shouldDisplaySecondModal = false;
  }

  public nextModal(studenObj : any) {
    if (this.studentData.indexOf(studenObj) < this.studentData.length - 1) {
      this.studentDisplayed = this.studentData[this.studentData.indexOf(studenObj)+1];
    }
  }

  public previousModal(studenObj : any) {
    if (this.studentData.indexOf(studenObj) > 0) {
      this.studentDisplayed = this.studentData[this.studentData.indexOf(studenObj)-1];
    }
  }

  

}
