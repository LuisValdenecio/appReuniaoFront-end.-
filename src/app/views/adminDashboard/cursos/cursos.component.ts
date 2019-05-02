import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent  {

  private courseData : any[];

  constructor(private dataModelInterface : DataModelInterface) {
    this.dataModelInterface.getAllCourses().subscribe(data=>{
      this.courseData = data;
    })
   }

   public createClass(curso : String) {
    this.dataModelInterface.createClass(curso);
   }

}
