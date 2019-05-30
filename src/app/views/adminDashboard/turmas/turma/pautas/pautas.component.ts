import { Component } from '@angular/core';
import { DataModelInterface } from 'src/app/dataModels/DataModelInterface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pautas',
  templateUrl: './pautas.component.html',
  styleUrls: ['./pautas.component.css']
})
export class PautasComponent  {

    public _studentData : any[];
    public _thisClassSubjects : any[];
    public thisClassGrade : String;
    public tipoDePauta : String;
    public theRealSubjectsToShow : any[] = [];
    public _markedSubjects : any[] = [];


    private thisClassesURL = window.location.href.split("/")[5]; // --> Substituição urgente (dependencia com o backend)
    private filteredAttribute : String = ""; // --> Substituição urgente (dependencia com o backend)

    // --> esta propriedade conterá o conjunto de informações sobre as notas da turma 
    private gradeDataToSend : any[] = [];
    public flagToDisableSelect : Boolean = true;

    constructor(private dataModelInterface : DataModelInterface, private router : Router) {

      this.dataModelInterface.getAllStudentsFromCLass("/"+this.formatURL()+"_students").subscribe(data=>{
        this._studentData = data;
      });

      this.dataModelInterface.getAllSubjects("/"+this.formatURL()).subscribe(data=>{
        this._thisClassSubjects = data;
      });

      this.dataModelInterface.getMarkedSubjects("/"+this.formatURL()+"_markedSubjects").subscribe(data=>{
      
        data.forEach((disc)=>{
          if (this._markedSubjects.indexOf(disc['disciplina_nome']) == -1){
            this._markedSubjects.push(disc['disciplina_nome']);
          }
        });

        this._thisClassSubjects.forEach((disc)=>{
          if (this._markedSubjects.indexOf(disc['disciplina_nome']) != -1) {
            this.theRealSubjectsToShow.push({'disciplina_nome' : disc['disciplina_nome']+"(notas ja lançadas nesta disciplina)"})
          } else {
            this.theRealSubjectsToShow.push({'disciplina_nome' : disc['disciplina_nome']});
          }
        });

      });

      // -->> determina qual modal mostrar para cada estudante
      this.dataModelInterface.getClassGrade("/"+this.formatURL()+"_classe").subscribe(data=>{
        this.thisClassGrade = data;

        if (data[0]['nome_class'] == 'Iniciação' || data[0]['nome_class'] == '1ª Classe' || 
          this.thisClassGrade[0]['nome_class'] == '2ª Classe' || data[0]['nome_class'] == '3ª Classe'
          || data[0]['nome_class'] == '4ª Classe') {

            this.tipoDePauta = "primario";
          
            this.gradeDataToSend.push({'disciplina_nome' : '','turma_id' : '', 'trimestre' : '', 'nivel' : 'primario'});
            
            for (let estudante = 0; estudante < this._studentData.length; estudante++) {
              this.gradeDataToSend.push({
                'estudantecod' : this._studentData[estudante]['estudantecod'], 
                'avaliacaodisciplinar' : '', 
                'situacaonotas' : '', 
                'resolucao_de_tarefas' : '',
                'evolucao' : '',
                'recuperacao' : false
              });

            }

          } else {

            this.tipoDePauta = "naoPrimario";
            
            this.gradeDataToSend.push({'disciplina_nome' : '','turma_id' : '',  'trimestre' : '', 'nivel' : 'tecnico'});

            for (let estudante = 0; estudante < this._studentData.length; estudante++) {
              this.gradeDataToSend.push({
                'estudantecod' : this._studentData[estudante]['estudantecod'],
                'avaliacaodisciplinar' : '',
                'pp1' : 0,
                'pp2' : 0,
                'ct' : 0,
                'participacao' : '',
                'recuperacao' : false,
                'mediaGlobalAnterior' : 0
              })
            }          
          }

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

  public alertWhenChangedDisciplina(value : any) {
    if (value.value.split("(")[0] != 'Avaliação Geral') {
      this.flagToDisableSelect = true;
    } else {
      this.flagToDisableSelect = false;
    } 
  }

  // -> métodos para processar os dados de estudantes do ensino primário 
  public resolucaoTarefas(classificacao, estudante) {
    this.gradeDataToSend.forEach((cadaEstudate)=>{  
        if (cadaEstudate['estudantecod'] == estudante['estudantecod']) {
          cadaEstudate['resolucao_de_tarefas'] = classificacao.value;
        }
    });
  }

  // -> métodos para processar os dados de estudantes do ensino primário 
  public evolucaoDados(classificacao, estudante) {
    this.gradeDataToSend.forEach((cadaEstudate)=>{  
        if (cadaEstudate['estudantecod'] == estudante['estudantecod']) {
          cadaEstudate['evolucao'] = classificacao.value;
        }
    });
  }

  // -> métodos para procesar os dados de estudantes do ensino técnico
  public participacaoAulas(classificacao, estudante) {
    this.gradeDataToSend.forEach((cadaEstudate)=>{  
      if (cadaEstudate['estudantecod'] == estudante['estudantecod']) {
        cadaEstudate['participacao'] = classificacao.value;
      }
    });
  }

  // --> to be removed ASAP
  public mediaGlobalAnterior(classificacao, estudante) {
    this.gradeDataToSend.forEach((cadaEstudate)=>{  
      if (cadaEstudate['estudantecod'] == estudante['estudantecod']) {
        cadaEstudate['mediaGlobalAnterior'] = classificacao.value;
      }
    });
  }

  // -> métodos para processar dados, tanto do ensino técnico como do ensino primário
  public avaliacaoDisciplinar(classificacao, estudante) {
    this.gradeDataToSend.forEach((cadaEstudate)=>{  
      if (cadaEstudate['estudantecod'] == estudante['estudantecod']) {
        cadaEstudate['avaliacaodisciplinar'] = classificacao.value;
      }
    });
  }

  // -> 
  public aulasDeRecuperacao(classificacao, estudante) {
    this.gradeDataToSend.forEach((cadaEstudate)=>{  
      if (cadaEstudate['estudantecod'] == estudante['estudantecod']) {
        cadaEstudate['recuperacao'] = (classificacao.value == 'on' ? true : false);
      }
    });
  }

  public mediaDeNotas(classificacao, estudante) {
    
    // -> lógica do método para o ensino primário
    if (this.tipoDePauta == "primario") {
      this.gradeDataToSend.forEach((cadaEstudate)=>{  
        if (cadaEstudate['estudantecod'] == estudante['estudantecod']) {
          cadaEstudate['situacaonotas'] = classificacao.value; 
        }
      });
    } 
    
    // -> para o ensino técnico
    else {
      this.gradeDataToSend.forEach((cadaEstudate)=>{  
        if (cadaEstudate['estudantecod'] == estudante['estudantecod']) {
          cadaEstudate['pp1'] = classificacao.value; 
        }
      });
    }
  }

  public salvarNotas(disciplinaNome : String) {

    // -> antes de enviar as infos de notas, actualize o nome da disciplina e o cod da turma
    this.gradeDataToSend[0]['disciplina_nome'] = disciplinaNome;
    this.gradeDataToSend[0]['turma_id'] = this.formatURL();

    this.dataModelInterface.sendGrades(this.gradeDataToSend).subscribe((data)=>{
      this.router.navigateByUrl("homeadmin/inicio")
    }, (err)=>{
      console.log(err);
    });
    
  }

}
