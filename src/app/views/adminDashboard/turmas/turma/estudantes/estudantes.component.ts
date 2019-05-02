import { Component } from '@angular/core';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent  {

  private shouldDisplayModal : Boolean = false;
  private studentData : any[] = [
    {"name" : "Luis Valdenêncio Tchitue"},
    {"name" : "Isaías Fernando Chitue"},
    {"name" : "Bernadeth Constância"},
    {"name" : "Benvinda Maria"},
    {"name" : "José Fernando Tchitue"},
    {"name" : "Luciano Basílio Tchitue"},
    {"name" : "Angífer Bernada"},
    {"name" : "Angelina Adelaide Cinco Reis"},
    {"name" : "Luciano Basílio Tchitue"},
    {"name" : "Angífer Bernada"},
    {"name" : "Angelina Adelaide Cinco Reis"}
  ];
  public studentDisplayed = this.studentData[0];

  constructor() { }

  public openModal(index : number) {
    this.studentDisplayed = this.studentData[index];
    this.shouldDisplayModal = true;
  }

  public closeModal() {
    this.shouldDisplayModal = false;
  }


}
