import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedRelatorioMethodsService {

  /* 
    Todo método antecedido de um underscore esta reservado para os
    estudantes do ensino técnico
  */

  public _processGrades(arrayOfData : any[], classGrade : String) {
    var arrayToReturn = [];
 
    if (classGrade != 'Iniciação' && classGrade != '1ª Classe' && classGrade != '2ª Classe' && classGrade != '3ª Classe' && classGrade != '4ª Classe') {
      for (let counter = 0; counter < arrayOfData.length; counter++) {
        if (arrayOfData[counter]['disciplina_nome'] != 'Avaliação Geral') {
          arrayToReturn.push(
            {
              'disciplinaNome' : arrayOfData[counter]['disciplina_nome'], 
              'valor' : arrayOfData[counter]['pp1'],
              'contribuicao' : Math.trunc((arrayOfData[counter]['pp1'] / this.processGradesSum(arrayOfData)) * 100),
              'class' : (arrayOfData[counter]['pp1'] < 10) ? 'Negativa' : 
              (arrayOfData[counter]['pp1'] >= 10 && arrayOfData[counter]['pp1'] <= 13) ? 'Positiva abaixo da Média' : 'Nota excelente'
            }
          );
        }
      } 
    } else {

      var qltData = {};

      for (let counter = 0; counter < arrayOfData.length; counter++) {
        if (arrayOfData[counter]['disciplina_nome'] != 'Avaliação Geral') {
          arrayToReturn.push(
            {
              'disciplinaNome' : arrayOfData[counter]['disciplina_nome'],
              'class' :  arrayOfData[counter]['situacaonotas']
            }
          );
        } else {
          qltData['comportamento'] = arrayOfData[counter]['avaliacaodisciplinar'];
          qltData['tarefas'] = arrayOfData[counter]['resolucao_de_tarefas'];
        }
      } 
    
      return [arrayToReturn, qltData]
    }

    return arrayToReturn;
  }

  private processGradesSum(arrayOfData : any[]) {
    var theTotalSum = 0;
    for (let counter = 0; counter < arrayOfData.length; counter++) {
      theTotalSum += arrayOfData[counter]['pp1'];
    }
    return theTotalSum;
  }

  public _processFaultsData(arrayOfData : any[]) {
    var arrayToReturn = [];
    var alreadyMarkedSubjects = [];

    if (arrayOfData.length > 0) {

      for (let counter = 0; counter < arrayOfData.length; counter++) {

        if (alreadyMarkedSubjects.indexOf(arrayOfData[counter]['disciplina_nome']) == -1) {
          var subjectToSum = arrayOfData.filter(disc => disc['disciplina_nome'] == arrayOfData[counter]['disciplina_nome']);
          arrayToReturn.push({
            'disciplinaNome' : arrayOfData[counter]['disciplina_nome'],
            'material' : this.processFaultsSum(subjectToSum)[2],
            'ausencia' : this.processFaultsSum(subjectToSum)[1],
            'disciplinar' : this.processFaultsSum(subjectToSum)[3],
            'pesoFaltas' : (this.processFaultsSum(subjectToSum)[0] / this.processFaultsSum(arrayOfData)[0]) * 100
          })
        
          alreadyMarkedSubjects.push(arrayOfData[counter]['disciplina_nome']);

        }
        
      }

    }

    return arrayToReturn;
  }

  public processFaultsSum(arrayOfData : any[]) {
    var ausencias = 0, material = 0, disciplinar = 0;
    var theTotalSum = 0;
    for (let counter = 0; counter < arrayOfData.length; counter++) {
      ausencias += arrayOfData[counter]['ausencia'];
      material += arrayOfData[counter]['material'];
      disciplinar +=arrayOfData[counter]['disciplinar'];
      theTotalSum += arrayOfData[counter]['material'] + arrayOfData[counter]['ausencia'] + arrayOfData[counter]['disciplinar'];
    }
    return [theTotalSum, ausencias, material, disciplinar];
  }



}
