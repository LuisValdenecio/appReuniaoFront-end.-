import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent  {

  private routeInfo : any;
  public display : Boolean = true; // --> isto é somente um hack para fazer desaparecer o view da turma
  public _studentData : any[];
  public _thisClassSubjects : any[];
  private thisClassesURL = window.location.href.split("/")[5]; // --> Substituição urgente (dependencia com o backend)
  private filteredAttribute : String = ""; // --> Substituição urgente (dependencia com o backend)

  constructor(private activeRoute : ActivatedRoute, private dataModelInterface : DataModelInterface) {
    this.activeRoute.url.subscribe(data=>{
      this.routeInfo = data;
    });

    this.dataModelInterface.getAllStudents().subscribe(data=>{
      this._studentData = data.filter(turma=> turma['turma_id'] == this.formatURL())
    });

    this.dataModelInterface.getAllSubjects("/"+this.formatURL()).subscribe(data=>{
      this._thisClassSubjects = data;
    });
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
