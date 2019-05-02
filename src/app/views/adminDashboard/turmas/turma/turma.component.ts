import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent  {

  private routeInfo : any;
  public display : Boolean = true; // --> isto é somente um hack para fazer desaparecer o view da turma

  constructor(activeRoute : ActivatedRoute) {
    activeRoute.url.subscribe(data=>{
      this.routeInfo = data;
    });
   }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  // --> isto é somente um hack para fazer desaparecer o view da turma
  public deleteParentView() {
    this.display = false;
  }
  
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];



}
