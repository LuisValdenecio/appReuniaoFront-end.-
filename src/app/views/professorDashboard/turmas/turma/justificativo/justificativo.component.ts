import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';

@Component({
  selector: 'app-justificativo',
  templateUrl: './justificativo.component.html',
  styleUrls: ['./justificativo.component.css']
})
export class JustificativoComponent {

 //-->> no cimo1 da classe vão os atributos que armazenam os dados principais (e são marcados por um underscore (_) no começo do nome)
 public _studentData : any[];
 public theCurrentStudentCod : any = {'estudantecod' : ''};
 public arrayOfSubjects : any[] = [];
 public _thisClassSubjectsForCoord : any[];
 
 public shoudlDisplayFaltasModal : Boolean = false;
 public filteredAttribute : String;
 private thisClassesURL = window.location.href.split("/")[5]; // --> Substituição urgente (dependencia com o backend)

//--> atributos que activam ou desactivam erros no form do justificativo de faltas
public erroSemDisciplinas : Boolean = false;
public erroSemNumeroFaltas : Boolean = false;

constructor(private dataModelInterface : DataModelInterface) {  
  
  this.dataModelInterface.getAllStudentsFromCLass("/"+this.formatURL()+"_students").subscribe(data=>{
    this._studentData = data;
  });

  this.dataModelInterface.getAllSubjects("/"+this.formatURL()).subscribe(data=>{
    this._thisClassSubjectsForCoord = data;
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

 public openModal(estudantecod : String) {
    // actualize o código do estudante
    this.theCurrentStudentCod['estudantecod'] = estudantecod;
    
    // apague qualquer registo de um estudante anterior
    this.arrayOfSubjects = [];

    this.shoudlDisplayFaltasModal = true; 
 }

 public closeModal() {
   this.shoudlDisplayFaltasModal = false;
 }

 public adicionarDisciplina(nomeDisciplina : String, numeroFaltas : number) {
   if (numeroFaltas <= 0) {
     this.erroSemNumeroFaltas = true;
   } else {
    this.erroSemNumeroFaltas = false;
    this.erroSemDisciplinas = false;
    this.arrayOfSubjects.push({'nomeDisciplina' : nomeDisciplina, 'numeroFaltas' : numeroFaltas})
   }
 }

 public eliminarDisciplina(index) {
  var novoVector = [];
  for (let counter = 0; counter < this.arrayOfSubjects.length; counter++) {
    if (counter != index) {
      novoVector.push(this.arrayOfSubjects[counter]);
    }
  }
  this.arrayOfSubjects = novoVector;
 }

 public justificarFaltas() {
  if (this.arrayOfSubjects.length == 0) {
    this.erroSemDisciplinas = true;
  } else {
    this.erroSemDisciplinas = false;
    this.dataModelInterface.faultsDeleter({'subjects' : this.arrayOfSubjects, 'studentCod' : this.theCurrentStudentCod}).subscribe((data)=>{
      console.log("jutificativo!");
    }, (err)=>{
      console.log(err);
    });
  }
  
 }


}



