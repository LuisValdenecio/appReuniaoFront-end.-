import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  private cursos : any[];

  constructor(private dataModelInterface : DataModelInterface, private router : Router) { }

  public getCourses() {
    this.dataModelInterface.getAllCourses().subscribe(data=>{
      this.cursos = data;
    })
  }

  public logout() {
    this.dataModelInterface.logout();
    this.router.navigateByUrl("/login");
  }


}
