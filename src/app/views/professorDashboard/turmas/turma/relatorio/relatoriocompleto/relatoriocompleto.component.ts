import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';
import { SharedRelatorioMethodsService } from './shared-relatorio-methods.service';

@Component({
  selector: 'app-relatoriocompleto',
  templateUrl: './relatoriocompleto.component.html',
  styleUrls: ['./relatoriocompleto.component.css']
})

export class RelatoriocompletoComponent  {
  public filteredAttribute : String;
  public studentData : any[];
  public faultsData : any[];
  public gradesData : any[];
  public justificativosData : any[];
  public thisClassGrade : String;

  private thisClassesURL : any;
  private thisStudentCod : any;

  constructor(private dataInterface : DataModelInterface, private utilMethods : SharedRelatorioMethodsService) {
    
    // esta condição é muito importante antes de inserir setar o valor do thisClassesURL 
    if (window.location.href.split("/")[5] != undefined && window.location.href.split("/")[5].length == 32) {
      this.thisClassesURL = window.location.href.split("/")[5];
    } else if (window.location.href.split("/")[14] != undefined && window.location.href.split("/")[14].length == 32) {
        this.thisClassesURL = window.location.href.split("/")[14];
    }  else if (window.location.href.split("/")[17] != undefined && window.location.href.split("/")[17].length == 32) {
        this.thisClassesURL = window.location.href.split("/")[17];
    }

    // esta condição é muito importante para relatórios individuais
    // esta condição é muito importante antes de inserir setar o valor do thisClassesURL 
    if (window.location.href.split("/")[7] != undefined && window.location.href.split("/")[7].length == 32) {
      this.thisStudentCod = window.location.href.split("/")[7];
    } else if (window.location.href.split("/")[16] != undefined && window.location.href.split("/")[16].length == 32) {
        this.thisStudentCod = window.location.href.split("/")[16];
    }  else if (window.location.href.split("/")[19] != undefined && window.location.href.split("/")[19].length == 32) {
        this.thisStudentCod = window.location.href.split("/")[19];
    }

    this.dataInterface.getAllStudentsFromCLass("/"+this.formatURL(this.thisClassesURL)+"_students").subscribe(data=>{
      this.studentData = data.filter(student => student['estudantecod'] == this.formatURL(this.thisStudentCod));
    });

    this.dataInterface.getThisClassFaults("/"+this.formatURL(this.thisClassesURL)+"_faults").subscribe(data=>{
      this.faultsData = data.filter(student => student['estudantecod'] == this.formatURL(this.thisStudentCod));
    });

    this.dataInterface.getClassGrades("/"+this.formatURL(this.thisClassesURL)+"_grades").subscribe(data=>{
      this.gradesData = data.filter(student => student['estudantecod'] == this.formatURL(this.thisStudentCod));
    });

    this.dataInterface.getJustificativoData().subscribe(data=>{
      this.justificativosData = data.filter(student => student['estudantecod'] == this.formatURL(this.thisStudentCod));
    });

    // -->> determina qual modal mostrar para cada estudante
    this.dataInterface.getClassGrade("/"+this.formatURL(this.thisClassesURL)+"_classe").subscribe(data=>{
      this.thisClassGrade = data;
    });

  }

   // --> Substituição urgente (dependencia com o backend)
   public formatURL(address : String) {

    this.filteredAttribute = "";

    for (let counter = 0; counter < address.length; counter++) {
      this.filteredAttribute += address.charAt(counter);
      if (counter == 7 || counter == 11 || counter == 15 || counter == 19) {
        this.filteredAttribute += "-"
      }
    }
    return this.filteredAttribute;
  }

  public dadosDasNotas() {
    return this.utilMethods._processGrades(this.gradesData, this.thisClassGrade[0]['nome_class']);
  }

  public dadosFaltas() {
    return this.utilMethods._processFaultsData(this.faultsData);
  }

  public dadosJustificativo() {
    return this.justificativosData;
  }

  
  
}
