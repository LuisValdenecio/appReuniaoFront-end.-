import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  public totalEstudantes : any[];
  public totalTurmas : any[] = [];
  public totalAlunas : any[];
  public totalAlunos : any[];
  public percentRapazes : String;
  public percentMeninas : String;
  
  constructor(private dataModelInterface : DataModelInterface) { 
    this.dataModelInterface.getAllStudents().subscribe(data=>{
      this.totalEstudantes = data;

      this.totalAlunas = data.filter(estudante=> estudante['genero'] == "F")
      this.totalAlunos = data.filter(estudante=> estudante['genero'] == "M");
      
      this.percentRapazes = Math.round((this.totalAlunos.length / data.length) * 100) + '%';
      this.percentMeninas = Math.round((this.totalAlunas.length / data.length) * 100) + '%';

    })

    this.dataModelInterface.getAllClasses().subscribe(data=>{
      this.totalTurmas = data.length;
    })
  }

 
}
