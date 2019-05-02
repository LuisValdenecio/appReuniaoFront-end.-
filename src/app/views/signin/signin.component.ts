import { Component, OnInit } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';
import { FormAuth } from '../sharedFormAuth/form-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  nameAuth : FormAuth = new FormAuth('', 'text');
  emailAuth : FormAuth = new FormAuth('', 'email');
  passWordAuth : FormAuth = new FormAuth('', 'text');

  //constructor(private dataModelInterface : DataModelInterface, private router : Router){}
  
  checkForm(nameValue : String, emailValue : String, passwordValue : String) {
    this.emailAuth.textoDoInput = emailValue;
    this.passWordAuth.textoDoInput = passwordValue;
    this.nameAuth.textoDoInput = nameValue;

    var isEmailOk : Boolean =  this.emailAuth.checkEmailInput();
    var isPasswrdOk : Boolean = this.passWordAuth.checkTextInput();
    var isNameOf : Boolean = this.nameAuth.checkTextInput();

    if (isEmailOk && isPasswrdOk && isNameOf) {
    
    } 
  }
 
  
}
