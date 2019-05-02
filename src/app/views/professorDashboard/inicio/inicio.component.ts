import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent  {

  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
  public barChartType = 'bar';
  public barChartLegend = true;
  
  public barChartData = [
    {data: [70, 59, 85, 90, 26, 35, 20], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

}
