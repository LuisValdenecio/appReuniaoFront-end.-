import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  private cursos : any[];

  constructor(private dataModelInterface : DataModelInterface) { }

  public getCourses() {
    this.dataModelInterface.getAllCourses().subscribe(data=>{
      this.cursos = data;
    })
  }

  


}
