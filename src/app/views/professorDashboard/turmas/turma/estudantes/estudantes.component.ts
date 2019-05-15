import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent  {

  public _studentData : any[];
  public _thisClassSubjects : any[];
  public typeOfInput : any = {'inputType' : 'checkbox', 'class': ''};

  // esta propriedade armazenará um vector de estudantes com as suas respectivas informações de faltas de volta ao servidor
  public studentDataToSend : any[] = [];

  private thisClassesURL = window.location.href.split("/")[5]; // --> Substituição urgente (dependencia com o backend)
  private filteredAttribute : String = ""; // --> Substituição urgente (dependencia com o backend)

  constructor(private dataModelInterface : DataModelInterface, private router : Router) {

    this.dataModelInterface.getAllStudentsFromCLass("/"+this.formatURL()+"_students").subscribe(data=>{
      this._studentData = data;

      // monte o objecto das faltas
      data.forEach((cadaEstudante)=>{

        this.studentDataToSend.push({
          'estudantecod' : cadaEstudante['estudantecod'],
          'ausencia' : 0,
          'material' : 0,
          'disciplinar' : 0
        });

      });

    });
    
    this.dataModelInterface.getThisTeachersSubjects("/"+this.dataModelInterface.parseJwt(this.dataModelInterface.getToken())['codUser']+"_"+this.formatURL()+"_teacherSubjects").subscribe(data=>{
      this._thisClassSubjects = data;
    })
   
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

  // --> Método utilizado para a marcação de faltas
  public marcarFaltas(nomeDisciplina : String) {
    console.log(this.studentDataToSend);

    // actualize o objecto de faltas antes de enviar as faltas para o servidor
    var dataFaultsObjectToSend = this.studentDataToSend.filter(estudante => estudante['ausencia'] > 0 && estudante['ausencia'] > 0 && estudante['ausencia'] > 0);

    // adicionar ao vector do objecto de faltas, o código da turma e o nome da disciplina 
    dataFaultsObjectToSend.push({'disciplina_nome' : nomeDisciplina});
    dataFaultsObjectToSend.push({'turma_id' : this.formatURL()});

    this.dataModelInterface.sendFaults(dataFaultsObjectToSend).subscribe((data)=>{
      this.router.navigateByUrl("homeprof/inicio");
      console.log(this.studentDataToSend);
    }, (err)=>{
      console.log(err);
    });
    
  }

  public changeManual() {
    if (this.typeOfInput['inputType'] == "checkbox") {
      this.typeOfInput['inputType'] = "text"
      this.typeOfInput['class'] = "faltasInput"
    }
  }

  public changeCheckBox() {
    if (this.typeOfInput['inputType'] != "checkbox") {
      this.typeOfInput['inputType'] = "checkbox"
      this.typeOfInput['class'] = ""
    }
  }

  // actualize as faltas por ausência
  public alertWhenTypedAusencias(typedInValue : any, studentInQuestion : any) {
    this.alertWhenTyped(typedInValue, studentInQuestion, 'ausencia');
  }

  // actualize as faltas por material
  public alertWhenTypedMateriais(typedInValue : any, studentInQuestion : any) {
    this.alertWhenTyped(typedInValue, studentInQuestion, 'material');
  }

  // acualize as faltas disciplinares
  public alertWhenTypedDisc(typedInValue : any, studentInQuestion : any) {
    this.alertWhenTyped(typedInValue, studentInQuestion, 'disciplinar');
  }

  public alertWhenTyped(typedInValue : any, studentInQuestion : any, typeOfData) {
    this.studentDataToSend.forEach((cadaEstudate)=>{
      if (cadaEstudate['estudantecod'] == studentInQuestion['estudantecod']) {
        if (typedInValue.checked) {
          cadaEstudate[typeOfData] = 1;
        } else if (typedInValue.value != 'on' && typeof Number(typedInValue.value) == 'number') {
          cadaEstudate[typeOfData] = Number(typedInValue.value);
        } else {
          cadaEstudate[typeOfData] = 0;
        }
      }
    })
  }

  
}
