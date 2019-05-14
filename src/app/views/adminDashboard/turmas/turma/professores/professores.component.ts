import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';
import { FormAuth } from 'src/app/views/sharedFormAuth/form-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent {

  private thisClassSubjects : any[];
  private shouldDisplayModal : Boolean = false;
  private thisClassesURL = window.location.href.split("/")[5]; // --> Substituição urgente (dependencia com o backend)

  public emailAuth : FormAuth = new FormAuth('', 'email');
  public passWordAuth : FormAuth = new FormAuth('', 'text');
  public nameAuth : FormAuth = new FormAuth('', 'text');
  public thisTeacherSubject : String;
  public filteredAttribute : String;

  constructor(private dataModelInterface : DataModelInterface, private router : Router) {
    this.dataModelInterface.getAllSubjects("/"+this.formatURL()).subscribe(data=>{
      this.thisClassSubjects = data;
    })
  }

  public openModal(subjectName : String) {
    this.thisTeacherSubject = subjectName;
    this.shouldDisplayModal = true;
  }

  public closeModal() {
    this.shouldDisplayModal = false;
  }

  checkForm(emailValue : String, passwordValue : String, nameValue : String, isCoordenador : Boolean) {

    this.emailAuth.textoDoInput = emailValue;
    this.passWordAuth.textoDoInput = passwordValue;
    this.nameAuth.textoDoInput = nameValue;

    var isEmailOk : Boolean =  this.emailAuth.checkEmailInput();
    var isPasswrdOk : Boolean = this.passWordAuth.checkTextInput();
    var isNameOk : Boolean = this.nameAuth.checkTextInput();

    if (isEmailOk && isPasswrdOk && isNameOk) {
      this.dataModelInterface.saveTeacher(
        {
          'email' : emailValue,
          'password' : passwordValue,
          'name' : nameValue,
          'coordenador' : isCoordenador,
          'turma_id' : this.formatURL(),
          'nomedisciplina' : this.thisTeacherSubject
        }).subscribe(()=>{
        this.closeModal();
      }, (err)=>{
        console.log(err);
      })
    }

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




}
