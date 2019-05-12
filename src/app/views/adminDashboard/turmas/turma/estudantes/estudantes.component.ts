import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';
import { StudentDataUtils } from './UtilityClasses/studentsDataUtilMethods';  

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})

export class EstudantesComponent  {

  //-->> no cimo1 da classe vão os atributos que armazenam os dados principais (e são marcados por um underscore (_) no começo do nome)
  private _studentData : any[];
  private _faultsData : any[];
  private _gradesData : any[];
  private _thisClassSubjects : any[];

  private shouldDisplayFirstModal : Boolean = false;
  private shouldDisplaySecondModal : Boolean = false;
  private thisClassesURL = window.location.href.split("/")[5]; // --> Substituição urgente (dependencia com o backend)
  
  //-->> a seguir vão os atributos dos data-binding 
  public studentDisplayed : any;
  public thisStudentNumber : number = 1;
  public thisStudentPhoto : String;
  public thisClassGrade : String;

  public thisStudentFaults : any;
  public thisStudentParticipations : any;
  public thisStudentGrades : any[];
  public thisStudentBehavior : any[];
  public thisStudentAvaliationInPercent : any;
  
  // -->> a seguir vão os atributos usados como indexes no data binding
  public thisStudentParticipationsIndex : number = 0;
  public topLevelIndexGrades : number = 0;
  public subGroupIndexGrades : number = 0;
  
  //-->> a seguir vão os atributos booleanos usados como indexes no data binding
  public firtsThreeAppear : Boolean = true;
  public mostrarNenhumaDisc : Boolean = false;
  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  
  public barChartLabels : any[];
  public barChartLegend = true;
  
  public barChartData : any[];

  private filteredAttribute : String = ""; // --> Substituição urgente (dependencia com o backend)

  constructor(private dataModelInterface : DataModelInterface, private studentDataUtils : StudentDataUtils) {
    
    this.dataModelInterface.getAllStudents().subscribe(data=>{
      this._studentData = data.filter(turma=> turma['turma_id'] == this.formatURL())
      this.studentDisplayed = data[0];    
    });

    this.dataModelInterface.getThisClassFaults("/"+this.formatURL()+"_faults").subscribe(data=>{
      this._faultsData = data;
    });

    this.dataModelInterface.getClassGrades("/"+this.formatURL()+"_grades").subscribe(data=>{
      this._gradesData = data;
    });
    
    this.dataModelInterface.getAllSubjects("/"+this.formatURL()).subscribe(data=>{
      this._thisClassSubjects = data;
    });

    // -->> determina qual modal mostrar para cada estudante
    this.dataModelInterface.getClassGrade("/"+this.formatURL()+"_classe").subscribe(data=>{
      this.thisClassGrade = data;
    });
    
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

  public openModal(index : number) {

    if (this.thisClassGrade[0]['nome_class'] == 'Iniciação' || this.thisClassGrade[0]['nome_class'] == '1ª Classe' || 
    this.thisClassGrade[0]['nome_class'] == '2ª Classe' || this.thisClassGrade[0]['nome_class'] == '3ª Classe'
     || this.thisClassGrade[0]['nome_class'] == '4ª Classe') {
      this.shouldDisplayFirstModal = true;
    } else {
      this.shouldDisplaySecondModal = true;
    }

    this.studentDisplayed = this._studentData[index];

    //-> Esta propriedade armazena toda informação relativa a faltas de um determinado estudante
    this.thisStudentFaults = this.studentDataUtils.processFaultsData(this._faultsData.filter(student => student['estudantecod'] == this._studentData[index]['estudantecod']), this._thisClassSubjects.length);
    // -> Esta propriedade armazena toda informação relativ a participação nas aulas de um determinado estudante
    this.thisStudentParticipations = this.studentDataUtils.processPartsData(this._faultsData.filter(student => student['estudantecod'] == this._studentData[index]['estudantecod']), this._thisClassSubjects.length);
    //--> Esta propriedade armazena toda informação relativa as notas de um determinado estudante
    this.thisStudentGrades = this.studentDataUtils.processGradesData(this._gradesData.filter(student => student['estudantecod'] == this._studentData[index]['estudantecod']));

    // --> Esta propriedade soma os pontos de todos os critérios de avaliação.
    this.thisStudentAvaliationInPercent = Math.trunc((Number(this.thisStudentGrades[3][0].pontuacaoGlobal.split("%")[0]) + 
        Number(this.thisStudentParticipations[1]['pontoGlobal'].split("%")[0]) + Number(this.thisStudentFaults['pontuacaoGlobal'].split("%")[0])) / 5) + '%';

    // --> o código abaixo, refere-se ao gráfico de representação de faltas
    this.barChartLabels = this.thisStudentFaults['forGraphData'][0];
    this.barChartData = [
      {data: this.thisStudentFaults['forGraphData'][1], label: 'Series A'},
      {data: this.thisStudentFaults['forGraphData'][2], label: 'Series B'},
      {data: this.thisStudentFaults['forGraphData'][3], label: 'Series B'}
    ];

    this.thisStudentPhoto = 'assets/img/';
    this.thisStudentPhoto += this._studentData[index].foto;
    this.thisStudentNumber = index + 1;
    this.thisStudentParticipationsIndex = 0;
    this.firtsThreeAppear = true;
    this.topLevelIndexGrades = 0;
    this.subGroupIndexGrades = 0;

    console.log(this.thisStudentFaults);

  }

  public closeModal() {
    this.shouldDisplayFirstModal = false;
    this.shouldDisplaySecondModal = false;
  }

  public nextModal(studenObj : any) {
    if (this._studentData.indexOf(studenObj) < this._studentData.length - 1) {
      this.studentDisplayed = this._studentData[this._studentData.indexOf(studenObj)+1];

      //-> Esta propriedade armazena toda informação relativa a faltas de um determinado estudante
      this.thisStudentFaults = this.studentDataUtils.processFaultsData(this._faultsData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)+1]['estudantecod']), this._thisClassSubjects.length);
      // -> Esta propriedade armazena toda informação relativ a participação nas aulas de um determinado estudante
      this.thisStudentParticipations = this.studentDataUtils.processPartsData(this._faultsData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)+1]['estudantecod']), this._thisClassSubjects.length);
      //--> Esta propriedade armazena toda informação relativa as notas de um determinado estudante
      this.thisStudentGrades = this.studentDataUtils.processGradesData(this._gradesData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)+1]['estudantecod']))

      // --> Esta propriedade soma os pontos de todos os critérios de avaliação.
      this.thisStudentAvaliationInPercent = Math.trunc((Number(this.thisStudentGrades[3][0].pontuacaoGlobal.split("%")[0]) + 
      Number(this.thisStudentParticipations[1]['pontoGlobal'].split("%")[0]) + Number(this.thisStudentFaults['pontuacaoGlobal'].split("%")[0])) / 5) + '%';

      this.thisStudentPhoto = 'assets/img/';
      this.thisStudentPhoto += this._studentData[this._studentData.indexOf(studenObj)+1].foto;
      
      // --> o código abaixo, refere-se ao gráfico de representação de faltas
      this.barChartLabels = this.thisStudentFaults['forGraphData'][0];
      this.barChartData = [
        {data: this.thisStudentFaults['forGraphData'][1], label: 'Series A'},
        {data: this.thisStudentFaults['forGraphData'][2], label: 'Series B'},
        {data: this.thisStudentFaults['forGraphData'][3], label: 'Series B'}
      ];
    
    
    }
    this.thisStudentNumber = (this.thisStudentNumber == this._studentData.length) ? this.thisStudentNumber + 0 : this.thisStudentNumber + 1;
    this.thisStudentParticipationsIndex = 0;
    this.firtsThreeAppear = true;
    this.topLevelIndexGrades = 0;
    this.subGroupIndexGrades = 0;
  

  }

  public previousModal(studenObj : any) {
    if (this._studentData.indexOf(studenObj) > 0) {
      this.studentDisplayed = this._studentData[this._studentData.indexOf(studenObj)-1]; 

      //-> Esta propriedade armazena toda informação relativa a faltas de um determinado estudante
      this.thisStudentFaults = this.studentDataUtils.processFaultsData(this._faultsData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)-1]['estudantecod']), this._thisClassSubjects.length);
      // -> Esta propriedade armazena toda informação relativ a participação nas aulas de um determinado estudante
      this.thisStudentParticipations = this.studentDataUtils.processPartsData(this._faultsData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)-1]['estudantecod']), this._thisClassSubjects.length);
      //--> Esta propriedade armazena toda informação relativa as notas de um determinado estudante
      this.thisStudentGrades = this.studentDataUtils.processGradesData(this._gradesData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)-1]['estudantecod']))

      // --> Esta propriedade soma os pontos de todos os critérios de avaliação.
      this.thisStudentAvaliationInPercent = Math.trunc((Number(this.thisStudentGrades[3][0].pontuacaoGlobal.split("%")[0]) + 
      Number(this.thisStudentParticipations[1]['pontoGlobal'].split("%")[0]) + Number(this.thisStudentFaults['pontuacaoGlobal'].split("%")[0])) / 5) + '%';

      this.thisStudentPhoto = 'assets/img/';  
      this.thisStudentPhoto += this._studentData[this._studentData.indexOf(studenObj)-1].foto;   
      
      // --> o código abaixo, refere-se ao gráfico de representação de faltas
      this.barChartLabels = this.thisStudentFaults['forGraphData'][0];
      this.barChartData = [
        {data: this.thisStudentFaults['forGraphData'][1], label: 'Series A'},
        {data: this.thisStudentFaults['forGraphData'][2], label: 'Series B'},
        {data: this.thisStudentFaults['forGraphData'][3], label: 'Series B'}
      ];
    
    }
    this.thisStudentNumber = (this.thisStudentNumber == 1) ? this.thisStudentNumber - 0 : this.thisStudentNumber - 1;
    this.thisStudentParticipationsIndex = 0;
    this.firtsThreeAppear = true;
    this.topLevelIndexGrades = 0;
    this.subGroupIndexGrades = 0;

  }

  public nextThree() {
    this.firtsThreeAppear = false;
  }

  public previousThree() {
    this.firtsThreeAppear = true;
  }

  public nextPartsItem() {
    if (this.thisStudentParticipationsIndex < this.thisStudentParticipations[0].length - 1) {
      this.thisStudentParticipationsIndex++;
    }
  }

  public previousPartsItem() {
    if (this.thisStudentParticipationsIndex > 0) {
      this.thisStudentParticipationsIndex--;
    }
  }

  public nextGradeItem() {
    if (this.thisStudentGrades[this.topLevelIndexGrades].length - 1 > this.subGroupIndexGrades) {
      this.subGroupIndexGrades++;
    } else {
      if (this.thisStudentGrades.length - 1 > this.topLevelIndexGrades) {
        this.subGroupIndexGrades = 0;
        this.topLevelIndexGrades++;
      }
    }
  }

  public previousGradeItem() {
   if (this.topLevelIndexGrades == 0 && this.subGroupIndexGrades > 0) {
    this.subGroupIndexGrades--;
   } else if (this.topLevelIndexGrades > 0 && this.subGroupIndexGrades == 0) {
     this.topLevelIndexGrades--;
     this.subGroupIndexGrades = this.thisStudentGrades[this.topLevelIndexGrades].length - 1;
   } else if (this.topLevelIndexGrades > 0  && this.subGroupIndexGrades > 0) {
     this.subGroupIndexGrades--;
   }
  }

  public organizeGradeGroups() {
    return this.thisStudentGrades[this.topLevelIndexGrades][this.subGroupIndexGrades];
  }

  

   

}
