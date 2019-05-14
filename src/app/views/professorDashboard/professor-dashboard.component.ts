import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataModelInterface} from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.css']
})
export class ProfessorDashboardComponent  {

  constructor(private dataModelInterface : DataModelInterface, private router : Router) { }

  logout() {
    this.dataModelInterface.logout();
    this.router.navigateByUrl("/login");
  }

}
