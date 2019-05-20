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
  public _studentData : any[];
  public _faultsData : any[];
  public _gradesData : any[];
  public _thisClassSubjects : any[];

  public shouldDisplayFirstModal : Boolean = false;
  public shouldDisplaySecondModal : Boolean = false;
  private thisClassesURL = window.location.href.split("/")[5]; // --> Substituição urgente (dependencia com o backend)
  
  //-->> a seguir vão os atributos dos data-binding 
  public studentDisplayed : any;
  public thisStudentNumber : number = 1;
  public thisStudentPhoto : String;
  public thisClassGrade : String;

  public thisStudentFaults : any;
  public thisStudentGrades : any[];
  public thisStudentBehavior : any[];
  public thisStudentParticipation : any;
  public thisStudentAvaliationInPercent : any;
  
  // -->> a seguir vão os atributos usados como indexes no data binding
  public topLevelIndexGrades : number = 0;
  public subGroupIndexGrades : number = 0;
  
  //-->> a seguir vão os atributos booleanos usados como indexes no data binding
  public firtsThreeAppear : Boolean = true;
  public mostrarNenhumaDisc : Boolean = false;
  
  private filteredAttribute : String = ""; // --> Substituição urgente (dependencia com o backend)

  constructor(private dataModelInterface : DataModelInterface, private studentDataUtils : StudentDataUtils) {
    
    this.dataModelInterface.getAllStudentsFromCLass("/"+this.formatURL()+"_students").subscribe(data=>{
      this._studentData = data;
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
    this.thisStudentFaults = this.studentDataUtils.processFaultsData(this._faultsData.filter(student => student['estudantecod'] == this._studentData[index]['estudantecod']), this._thisClassSubjects.length, this._faultsData);
    //--> Esta propriedade armazena toda informação relativa as notas de um determinado estudante
    this.thisStudentGrades = this.studentDataUtils.processGradesData(this._gradesData.filter(student => student['estudantecod'] == this._studentData[index]['estudantecod']));

    // --> Esta propriedade soma os pontos de todos os critérios de avaliação.
    this.thisStudentAvaliationInPercent = Math.trunc((Number(this.thisStudentGrades[this.thisStudentGrades.length - 1][0].pontuacaoGlobal.split("%")[0]) + Number(this.thisStudentFaults['pontuacaoGlobal'].split("%")[0])) / 5) + '%';

    this.thisStudentParticipation = this.studentDataUtils.processQualityData(this._gradesData.filter(student => student['estudantecod'] == this._studentData[index]['estudantecod']));
  
    this.thisStudentPhoto = 'assets/img/';
    this.thisStudentPhoto += this._studentData[index].foto;
    this.thisStudentNumber = index + 1;
    this.firtsThreeAppear = true;
    this.topLevelIndexGrades = 0;
    this.subGroupIndexGrades = 0;

  }

  public closeModal() {
    this.shouldDisplayFirstModal = false;
    this.shouldDisplaySecondModal = false;
  }

  public nextModal(studenObj : any) {
    if (this._studentData.indexOf(studenObj) < this._studentData.length - 1) {
      this.studentDisplayed = this._studentData[this._studentData.indexOf(studenObj)+1];

      //-> Esta propriedade armazena toda informação relativa a faltas de um determinado estudante
      this.thisStudentFaults = this.studentDataUtils.processFaultsData(this._faultsData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)+1]['estudantecod']), this._thisClassSubjects.length, this._faultsData);
      //--> Esta propriedade armazena toda informação relativa as notas de um determinado estudante
      this.thisStudentGrades = this.studentDataUtils.processGradesData(this._gradesData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)+1]['estudantecod']))
      // --> Esta propriedade armazena toda informação relativa a participação nas aulas e ao comportamento
      this.thisStudentParticipation = this.studentDataUtils.processQualityData(this._gradesData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)+1]['estudantecod']));
  
      // --> Esta propriedade soma os pontos de todos os critérios de avaliação.
      this.thisStudentAvaliationInPercent = Math.trunc((Number(this.thisStudentGrades[this.thisStudentGrades.length - 1][0].pontuacaoGlobal.split("%")[0]) + Number(this.thisStudentFaults['pontuacaoGlobal'].split("%")[0])) / 5) + '%';

      this.thisStudentPhoto = 'assets/img/';
      this.thisStudentPhoto += this._studentData[this._studentData.indexOf(studenObj)+1].foto;
      
      // --> o código abaixo, refere-se ao gráfico de representação de faltas
      console.log(this.thisStudentGrades);    
    
    }
    this.thisStudentNumber = (this.thisStudentNumber == this._studentData.length) ? this.thisStudentNumber + 0 : this.thisStudentNumber + 1;
    this.firtsThreeAppear = true;
    this.topLevelIndexGrades = 0;
    this.subGroupIndexGrades = 0;

  }

  public previousModal(studenObj : any) {
    if (this._studentData.indexOf(studenObj) > 0) {
      this.studentDisplayed = this._studentData[this._studentData.indexOf(studenObj)-1]; 

      //-> Esta propriedade armazena toda informação relativa a faltas de um determinado estudante
      this.thisStudentFaults = this.studentDataUtils.processFaultsData(this._faultsData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)-1]['estudantecod']), this._thisClassSubjects.length, this._faultsData);
      //--> Esta propriedade armazena toda informação relativa as notas de um determinado estudante
      this.thisStudentGrades = this.studentDataUtils.processGradesData(this._gradesData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)-1]['estudantecod']))
      // --> Esta propriedade armazena toda informação relativa a participação nas aulas e ao comportamento
      this.thisStudentParticipation = this.studentDataUtils.processQualityData(this._gradesData.filter(student => student['estudantecod'] == this._studentData[this._studentData.indexOf(studenObj)-1]['estudantecod']));
  
      // --> Esta propriedade soma os pontos de todos os critérios de avaliação.
      this.thisStudentAvaliationInPercent = Math.trunc((Number(this.thisStudentGrades[this.thisStudentGrades.length - 1][0].pontuacaoGlobal.split("%")[0]) + Number(this.thisStudentFaults['pontuacaoGlobal'].split("%")[0])) / 5) + '%';

      this.thisStudentPhoto = 'assets/img/';  
      this.thisStudentPhoto += this._studentData[this._studentData.indexOf(studenObj)-1].foto;   
      
      // --> o código abaixo, refere-se ao gráfico de representação de faltas
          

    }
    this.thisStudentNumber = (this.thisStudentNumber == 1) ? this.thisStudentNumber - 0 : this.thisStudentNumber - 1;
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
