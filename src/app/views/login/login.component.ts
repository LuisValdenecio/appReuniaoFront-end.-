import { Component, OnInit } from '@angular/core';
import { FormAuth } from '../sharedFormAuth/form-auth';
import {LoginModel} from 'src/app/dataModels/AllDataModel';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  public showLoginWarning : Boolean = false;
  public warningMssg : String = "";

  constructor(private dataModelInterface : DataModelInterface, private router : Router){}

  emailAuth : FormAuth = new FormAuth('', 'email');
  passWordAuth : FormAuth = new FormAuth('', 'text');

  dismissWarning() {
    this.showLoginWarning = false;
  }
  
  checkForm(emailValue : String, passwordValue : String) {

    this.emailAuth.textoDoInput = emailValue;
    this.passWordAuth.textoDoInput = passwordValue;

    var isEmailOk : Boolean =  this.emailAuth.checkEmailInput();
    var isPasswrdOk : Boolean = this.passWordAuth.checkTextInput();
    
    if (isEmailOk && isPasswrdOk) {
      this.dataModelInterface.loginCheck(emailValue, passwordValue).subscribe((data)=>{
        if (data) {
          this.warningMssg = data;
          this.showLoginWarning = true;
        }
        
        if (this.dataModelInterface.parseJwt(localStorage.getItem("goldToken"))['typeOfUser'] == "'admin'") {
          this.router.navigateByUrl('/homeadmin');
        } else {
          this.router.navigateByUrl('/homeprof');
        }
        
      }, (err)=>{
        console.log(err);
      })
    } 

  }

}
