import {Injectable} from '@angular/core';

@Injectable()
export class StudentDataUtils {

    public sumTheWholeClassFaults(arrayOfData : any[]) {
        var totalOfFaults = 0;
        arrayOfData.forEach((each)=>{
           totalOfFaults += each['ausencia'] + each['material'] + each['disciplinar']
        })
        return totalOfFaults;
    }

    public stringShortenerInArray(arrayOfData, shortIndex) {
        var newArray = [];
        arrayOfData.forEach((ele)=>{
            if (arrayOfData.length == 1) {
                if (ele.length > 12) {
                    newArray.push(ele.slice(0,11));
                } else {
                    newArray.push(ele);
                }
                
            } else {
                if (ele == 'Língua Portuguesa') {   //-->> para não confundir com Língua Inglesa
                    newArray.push(" Port");
                } else if (ele == 'Educação Laboral') { // -->> para não confundir com uma outra disciplina que começe com Educação
                    newArray.push(" Labo");
                } else  if (ele == 'Educação Visual e Plástica') { // -->> para não confundir com uma outra disciplina que começe com Educação
                    newArray.push(" EVP");
                } else if (ele == 'Educação Moral e Cívica') { // -->> para não confundir com uma outra disciplina que começe com Educação
                    newArray.push(" EMC");
                } else {
                    newArray.push(" "+ele.slice(0,shortIndex)); 
                }
            
                
            }
            
        })
        return newArray;
    }

    public processQualityData(arrayOfData : any[]) {
        var arrayOfQlyData = arrayOfData.filter(disciplina=> disciplina['disciplina_nome'] == 'Avaliação Geral');
        
        return {
            'particapacao' : arrayOfQlyData[0]['participacao'],
            'iconePart' : (arrayOfQlyData[0]['participacao'] == 'Satistatório') ? 'fa fa-check-circle' : 
                (arrayOfQlyData[0]['participacao'] == 'Insatisfatório') ? 'fa fa-times-circle' : 'fa fa-exclamation-triangle',
            'percentPart' : (arrayOfQlyData[0]['participacao'] == 'Satistatório') ? '100%' : 
            (arrayOfQlyData[0]['participacao'] == 'Insatisfatório') ? '0%' : '50%',
            'avalicaoDisciplinar' : arrayOfQlyData[0]['comportamento'],
            'iconeComport' :  (arrayOfQlyData[0]['comportamento'] == 'Positiva') ? 'fa fa-check-circle' : 
            (arrayOfQlyData[0]['comportamento'] == 'Negativa') ? 'fa fa-times-circle' : 'fa fa-exclamation-triangle',
            'percentComport' : (arrayOfQlyData[0]['comportamento'] == 'Positiva') ? '100%' : 
            (arrayOfQlyData[0]['comportamento'] == 'Negativa') ? '0%' : '50%',
        }
    }

    public processGradesData(arrayOfData : any[]) {
        //--> first group (notas >= 14); second group (positivas < 14); third group (negativas)
        var dataToReturn = [];    
        var firstGroup = [], secondGroup = [], thirdGroup = [];

        // --> valores para o resumo do critério de notas
        var average = 0, percentOfGrades = 0; 

        // --> pontuação global em %
        var pontGlobal = 100;

        for (let counter = 0; counter < arrayOfData.length; counter++) {

            average += arrayOfData[counter]['pp1'];

            if (arrayOfData[counter]['pp1'] >= 10) {
                percentOfGrades += 1;
            }
            
            if (arrayOfData[counter]['pp1'] >= 14) {
                firstGroup.push(arrayOfData[counter]['disciplina_nome']);
            } else if (arrayOfData[counter]['pp1'] < 14 && arrayOfData[counter]['pp1'] >= 10) {
                pontGlobal = pontGlobal - ((100 / arrayOfData.length) / 2);
                secondGroup.push(arrayOfData[counter]['disciplina_nome']);
            } else {
                pontGlobal = pontGlobal - ((100 / arrayOfData.length))
                thirdGroup.push(arrayOfData[counter]['disciplina_nome']);
            }
        }

        if (firstGroup.length > 0 && secondGroup.length > 0 && thirdGroup.length > 0) {
            dataToReturn.push({
                'vectorDasDisc':  this.stringShortenerInArray(firstGroup.concat(secondGroup), 4).splice(0,4).toString()+((firstGroup.concat(secondGroup).length >= 4)?",...":"."),
                'class' : 'mixPositivas'
            });

            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(thirdGroup, 4).splice(0,4).toString()+((thirdGroup.length >= 4)?",...":"."), 
                'class' : 'negativas'
            });

        } else if (firstGroup.length > 0 && secondGroup.length == 0 && thirdGroup.length == 0) {
            dataToReturn.push({
                'vectorDasDisc':  this.stringShortenerInArray(firstGroup.concat(secondGroup), 4).splice(0,4).toString()+((firstGroup.concat(secondGroup).length >= 4)?",...":"."),
                'class' : 'soAcimaDe14'
            });

            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(thirdGroup, 4).splice(0,4).toString()+((thirdGroup.length >= 4)?",...":"."), 
                'class' : 'negativas'
            });

        } else if (firstGroup.length == 0 && secondGroup.length > 0 && thirdGroup.length == 0) {
            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(secondGroup, 4).splice(0,4).toString()+((secondGroup.length >= 4)?",...":"."), 
                'class' : 'positivasAbaixoDe14'
            });

            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(thirdGroup, 4).splice(0,4).toString()+((thirdGroup.length >= 4)?",...":"."), 
                'class' : 'negativas'
            });

        } else if (secondGroup.length > 0 && firstGroup.length == 0 && thirdGroup.length > 0) {
            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(secondGroup, 4).splice(0,4).toString()+((secondGroup.length >= 4)?",...":"."), 
                'class' : 'positivasAbaixoDe14'
            });

            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(thirdGroup, 4).splice(0,4).toString()+((thirdGroup.length >= 4)?",...":"."), 
                'class' : 'negativas'
            });

         } else if (secondGroup.length == 0 && firstGroup.length == 0) {            
            dataToReturn.push({
                'vectorDasDisc': 'Sem Positivas', 
                'class' : 'soAcimaDe14'
            });

            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(thirdGroup, 4).splice(0,4).toString()+((thirdGroup.length >= 4)?",...":"."), 
                'class' : 'negativas'
            });
         } else if (firstGroup.length > 0 && secondGroup.length > 0 && thirdGroup.length == 0) {
            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(firstGroup, 4).splice(0,4).toString()+((firstGroup.length >= 4)?",...":"."), 
                'class' : 'soAcimaDe14'
            });

            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(secondGroup, 4).splice(0,4).toString()+((secondGroup.length >= 4)?",...":"."), 
                'class' : 'positivasAbaixoDe14'
            });
        } 
        
        dataToReturn.push([
            {
                'mediaNotas' : {
                    'media' : Math.trunc(average / arrayOfData.length), 
                    'class' : Math.trunc(average / arrayOfData.length) >= 10 ? 
                        (Math.trunc(average / arrayOfData.length) >= 14 ? 'soAcimaDe14' : 'positivasAbaixoDe14') : 'negativas' 
                },
                'percentDeSucesso' : {
                    'percent':Math.trunc((percentOfGrades / arrayOfData.length) * 100),
                    'class' : Math.trunc((percentOfGrades / arrayOfData.length) * 100) >= 50 ? 'soAcimaDe14' : 'negativas'
                },
                'pontuacaoGlobal' : Math.trunc(pontGlobal) + '%' 
            }
        ]) //-> Objecto do resumo do critério do desempenho ao nível de notas

        return dataToReturn;
    }

    public processPartsData(arrayOfData : any[], numberOfSubjects : number) {
        var partPorDisciplina = [], alreadyChecked = [];
        var timesCounter = 0;

        partPorDisciplina.push([]);

        // --> pontuação global em %
        var pontGlobal = 100;

        for (let counter = 0; counter < arrayOfData.length; counter++) {
            if (alreadyChecked.indexOf(arrayOfData[counter]['disciplina_nome']) == -1) {
                
                // -->> descontando pontos por má participação nas aulas
                if (this.sumUtilParts(arrayOfData.filter(data => data['disciplina_nome'] == arrayOfData[counter]['disciplina_nome']))['icone'] == 'fa fa-times-circle') {
                    pontGlobal = pontGlobal - (100 / numberOfSubjects);
                } else if (this.sumUtilParts(arrayOfData.filter(data => data['disciplina_nome'] == arrayOfData[counter]['disciplina_nome']))['icone'] == 'fa fa-exclamation-triangle') {
                    pontGlobal = pontGlobal - ((100 / numberOfSubjects) / 2);
                }

                if (timesCounter < 3) {
                    partPorDisciplina[partPorDisciplina.length-1].push(
                        this.sumUtilParts(arrayOfData.filter(data => data['disciplina_nome'] == arrayOfData[counter]['disciplina_nome']))
                    )
                } else {
                    partPorDisciplina.push([]);
                    partPorDisciplina[partPorDisciplina.length-1].push(
                        this.sumUtilParts(arrayOfData.filter(data => data['disciplina_nome'] == arrayOfData[counter]['disciplina_nome']))
                    )
                    timesCounter = 0;
                }
                
                timesCounter++;
                
                alreadyChecked.push(arrayOfData[counter]['disciplina_nome']);           
            }
        }

        // -->> este código é para casos de estudantes que nunca estiveram na aula de alguma/s disciplina/s
        if (Math.trunc(pontGlobal) > 0 && alreadyChecked.length < numberOfSubjects) {
            pontGlobal = pontGlobal - ((100 / numberOfSubjects) * (numberOfSubjects - alreadyChecked.length));
        }

        // -->> vou retornar um vector de dois elementos, faço isto para não frustar a lógica do template
        return [partPorDisciplina, {'pontoGlobal' : Math.trunc(pontGlobal) + '%'}];
    }

    public processFaultsData(arrayOfFaults : any[], numberOfSubjects : number, theClassFaults : any[]) {

        var nomeDisciplina = [], faltasTotal = [];

        // --> pontuação global em %
        var pontGlobal = 100;

        // --> calcula o total de faltas que a turma tem
        var totalDeFaltasDaTurma = this.sumTheWholeClassFaults(theClassFaults);

        for (let counter = 0; counter < arrayOfFaults.length; counter++) {

            if (nomeDisciplina.indexOf(arrayOfFaults[counter]['disciplina_nome']) == -1 && 
                (arrayOfFaults[counter]['ausencia'] > 0 || arrayOfFaults[counter]['material'] > 0 || arrayOfFaults[counter]['disciplinar'] > 0 )) {

                faltasTotal.push(
                    this.sumUtilFaults(arrayOfFaults.filter(data => data['disciplina_nome'] == arrayOfFaults[counter]['disciplina_nome']), true)
                )

                nomeDisciplina.push(arrayOfFaults[counter]['disciplina_nome']);
            }
        }

        // -->> descontando pontos pelas ausências
        pontGlobal -= ((100 / numberOfSubjects) / 2) * this.sumUtilFaults(faltasTotal, false)['faltasAusencia']; 
            
        // -->> descontando pontos pelas faltas de materiais
        pontGlobal = pontGlobal - ((100 / numberOfSubjects) / 4) * this.sumUtilFaults(faltasTotal, false)['faltasMaterial']; 
        
        // -->> descontando pontos pelas faltas disciplinares
        pontGlobal = pontGlobal - ((100 / numberOfSubjects) * 2) * this.sumUtilFaults(faltasTotal, false)['faltasDisciplinar']; 
        
        // -->> coloque aqui também um campo para faltas justificadas


        pontGlobal = (pontGlobal < 0) ? 0 : pontGlobal;

        // --> o primeiro argumento deste objecto, será usado como valores para o constructor de um objecto gráfico para representação de faltas
        return {
            'toDisplay' : {
                'pesoDasFaltas' : Math.trunc((this.sumUtilFaults(faltasTotal, false)['totalFaltas'] / totalDeFaltasDaTurma) * 100) + '%',
                'discFaltosas' : this.stringShortenerInArray(nomeDisciplina, 4).splice(0,3).toString()+((nomeDisciplina.length > 3)?",...":"."),
                'totalFaltas' : this.sumUtilFaults(faltasTotal, false)['totalFaltas']
            }, 
            'displayData' : this.sumUtilFaults(faltasTotal, false), 'pontuacaoGlobal' : Math.trunc(pontGlobal) + '%' 
        }            
    }

    private sumUtilParts(arr : any[]) {
        var partAulas = 0;
        var dadosARetornar = {};

        dadosARetornar['nomeDisciplina'] = arr[0]['disciplina_nome'];

        for (let counter = 0; counter < arr.length; counter++) {
            partAulas += arr[counter]['participacao'];            
        }

        dadosARetornar['participacao'] = partAulas;

        // atribuí um ícone ao nível de participação
        if (partAulas == 0) {
            dadosARetornar['icone'] = 'fa fa-times-circle';
        } else if (partAulas >= 1 && partAulas <= 5) {
            dadosARetornar['icone'] = 'fa fa-exclamation-triangle';
        } else {
            dadosARetornar['icone'] = 'fa fa-check-circle'
        }
        return dadosARetornar
    }

    private sumUtilFaults(arr : any[], graphFlag) {
        var faltaAusencia = 0, faltaMaterial = 0, faltaDisciplinar = 0;
        
        var dadosARetornar = {};

        if (graphFlag) {

            dadosARetornar['nomeDisciplina'] = arr[0]['disciplina_nome'];
        
            for (let counter = 0; counter < arr.length; counter++) {
                faltaAusencia += arr[counter]['ausencia'];
                faltaMaterial += arr[counter]['material'];
                faltaDisciplinar += arr[counter]['disciplinar'];
            }

        } else {

            for (let counter = 0; counter < arr.length; counter++) {
                faltaAusencia += arr[counter]['faltasAusencia'];
                faltaMaterial += arr[counter]['faltasMaterial'];
                faltaDisciplinar += arr[counter]['faltasDisciplinar'];
            }

        }
       
        dadosARetornar['faltasAusencia'] = faltaAusencia;
        dadosARetornar['faltasMaterial'] = faltaMaterial;
        dadosARetornar['faltasDisciplinar'] = faltaDisciplinar;
        dadosARetornar['totalFaltas'] = faltaAusencia + faltaMaterial + faltaDisciplinar;

        return dadosARetornar;
    }

    public _situacaoNotas(arrayOfData, faultsPoints) {

        var disciplinasEmAlta = [], disciplinasEmBaixa = [], disciplinasNoMeio = [];
        var informatica = 0, culinaria = 0, ingles = 0, teatro = 0, xadrez = 0;
        var resolucaoTarefas = -1, avaliacaoDisciplinar = "Sem dados";

        var pontuacaoGlobal = 500;
        var pontosFaltasDescontar = 100 - Number(faultsPoints.slice(0,faultsPoints.length-1)) 
        

        arrayOfData.forEach((disciplina)=>{

            // ignore avalicão geral
            if (disciplina['disciplina_nome'] != 'Avaliação Geral') {

                if (disciplina['disciplina_nome'] == 'Culinaria') {
                    if (disciplina['situacaonotas'] == 'Em Baixa') {
                        culinaria = -1; 
                        pontuacaoGlobal -= 10;
                    } else if (disciplina['situacaonotas'] == 'Em Alta') {
                        culinaria = 2;
                    } else {
                        pontuacaoGlobal -= 5;
                        culinaria = 1;
                    }
                } else if (disciplina['disciplina_nome'] == 'Iniciação à Informática') {
                    if (disciplina['situacaonotas'] == 'Em Baixa') {
                        informatica = -1; 
                        pontuacaoGlobal -= 10;
                    } else if (disciplina['situacaonotas'] == 'Em Alta') {
                        informatica = 2;
                    } else {
                        pontuacaoGlobal -= 5;
                        informatica = 1;
                    }
                } else if (disciplina['disciplina_nome'] == 'Língua Inglesa') {
                    if (disciplina['situacaonotas'] == 'Em Baixa') {
                        ingles = -1; 
                        pontuacaoGlobal -= 10;
                    } else if (disciplina['situacaonotas'] == 'Em Alta') {
                        ingles = 2;
                    } else {
                        ingles = 1;
                        pontuacaoGlobal -= 5;
                    }
                } else if (disciplina['disciplina_nome'] == 'Xadrez') {
                    if (disciplina['situacaonotas'] == 'Em Baixa') {
                        xadrez = -1; 
                        pontuacaoGlobal -= 10;
                    } else if (disciplina['situacaonotas'] == 'Em Alta') {
                        xadrez = 2;
                    } else {
                        xadrez = 1;
                        pontuacaoGlobal -= 5;
                    }
                } else if (disciplina['disciplina_nome'] == 'Teatro') {
                    if (disciplina['situacaonotas'] == 'Em Baixa') {
                        teatro = -1; 
                        pontuacaoGlobal -= 10;
                    } else if (disciplina['situacaonotas'] == 'Em Alta') {
                        teatro = 2;
                    } else {
                        teatro = 1;
                        pontuacaoGlobal -= 5;
                    }
                } else {

                    if (disciplina['situacaonotas'] == 'Em Baixa') {
                        disciplinasEmBaixa.push(disciplina['disciplina_nome']);
                        pontuacaoGlobal -= 10;
                    } else if (disciplina['situacaonotas'] == 'Em Alta') {
                        disciplinasEmAlta.push(disciplina['disciplina_nome']);
                    } else {
                        disciplinasNoMeio.push(disciplina['disciplina_nome']);
                        pontuacaoGlobal -= 5;
                    }

                }

            } else {

               if (disciplina['resolucao_de_tarefas'] == 'Nunca Resolve') {
                    resolucaoTarefas = 0;
                    pontuacaoGlobal -= 50;
               } else if (disciplina['resolucao_de_tarefas'] == 'Resolve Raras vezes') {
                    resolucaoTarefas = 1;
                    pontuacaoGlobal -= 20;
               } else if (disciplina['resolucao_de_tarefas'] == 'Resolve Mal') {
                    resolucaoTarefas = 2;
                    pontuacaoGlobal -= 10;
               } else if (disciplina['resolucao_de_tarefas'] == 'Resolve Razoavelmente') {
                    resolucaoTarefas = 2;
                    pontuacaoGlobal -= 5;
               } else if (disciplina['resolucao_de_tarefas'] == 'Resolve Bem') {
                    resolucaoTarefas = 4;
               } else {
                    resolucaoTarefas = 5;
               }   

               avaliacaoDisciplinar = disciplina['avaliacaodisciplinar'];
                if (avaliacaoDisciplinar == 'Negativa') {
                    pontuacaoGlobal -= 100;
                } else if (avaliacaoDisciplinar == 'Regular') {
                        pontuacaoGlobal -= 20;
                } 
            }
        })

        // descontando as faltas
        console.log(pontuacaoGlobal);
        console.log(pontosFaltasDescontar);
        pontuacaoGlobal = pontuacaoGlobal - pontosFaltasDescontar;

        return {
            'disciplinasEmBaixa' : {
                'valor' : (disciplinasEmBaixa.length > 0) ? 
                    this.stringShortenerInArray(disciplinasEmBaixa, 5).splice(0,5).toString()+((disciplinasEmBaixa.length >= 5)?" ,...":".") : 'Sem disciplinas em baixa'
            },
            'disciplinasEmAlta' : {
                'valor' : (disciplinasEmAlta.length > 0) ? 
                    this.stringShortenerInArray(disciplinasEmAlta, 5).splice(0,5).toString()+((disciplinasEmAlta.length >= 5)?" ,...":".") : 'Sem disciplinas em alta'
            },
            'disciplinasNoMeio' : {
                'valor' : (disciplinasNoMeio.length > 0) ? 
                this.stringShortenerInArray(disciplinasNoMeio, 5).splice(0,5).toString()+((disciplinasNoMeio.length >= 5)?" ,...":".") : 'Sem disciplinas no nível intermédio'
            },
            'disciplinasExtras' : {
                'culinaria' : (culinaria == 0) ? 'transparente' : (culinaria == -1) ? 'vermelho' : (culinaria == 2) ? 'verde' : 'laranja',
                'informatica' : (informatica == 0) ? 'transparente' : (informatica == -1) ? 'vermelho' : (informatica == 2) ? 'verde' : 'laranja',
                'ingles' : (ingles == 0) ? 'transparente' : (ingles == -1) ? 'vermelho' : (ingles == 2) ? 'verde' : 'laranja',
                'xadrez' : (xadrez == 0) ? 'transparente' : (xadrez == -1) ? 'vermelho' : (xadrez == 2) ? 'verde' : 'laranja',
                'teatro' : (teatro == 0) ? 'transparente' : (teatro == -1) ? 'vermelho' : (teatro == 2) ? 'verde' : 'laranja'
            },
            'resolucaoDeTarefas' : {
                'valor' : (resolucaoTarefas == -1) ? [] : (resolucaoTarefas == 0) ? [{'color' : '#c6e1c6'},{'color' : '#c6e1c6'},{'color' : '#c6e1c6'},{'color' : '#c6e1c6'},{'color' : '#c6e1c6'}] : 
                    (resolucaoTarefas == 1) ? [{'color' : 'red'},{'color' : '#c6e1c6'},{'color' : '#c6e1c6'},{'color' : '#c6e1c6'},{'color' : '#c6e1c6'}] :
                    (resolucaoTarefas == 2) ? [{'color' : 'red'},{'color' : 'red'},{'color' : '#c6e1c6'},{'color' : '#c6e1c6'},{'color' : '#c6e1c6'}] : 
                    (resolucaoTarefas == 3) ? [{'color' : 'orange'},{'color' : 'orange'},{'color' : 'orange'},{'color' : '#c6e1c6'},{'color' : '#c6e1c6'}] : 
                    (resolucaoTarefas == 4) ? [{'color' : 'green'},{'color' : 'green'},{'color' : 'green'},{'color' : 'green'},{'color' : '#c6e1c6'}] : 
                        [{'color' : 'green'},{'color' : 'green'},{'color' : 'green'},{'color' : 'green'},{'color' : 'green'}]
            },
            'avaliacao_disciplinar' : {
                'valor' : avaliacaoDisciplinar, 'icone' : (avaliacaoDisciplinar == 'Sem dados') ? 'fa fa-plug' : (avaliacaoDisciplinar == 'Positiva') ? 'fa fa-check-circle' : 
                (avaliacaoDisciplinar == 'Negativa') ? 'fa fa-times-circle' : 'fa fa-exclamation-triangle'
            },
            'pontuacaoGlobal' : Math.trunc(pontuacaoGlobal / 5) + '%'
        }
    }



}