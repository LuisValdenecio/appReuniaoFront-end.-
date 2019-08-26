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
                    newArray.push(" L.Port");
                } else if (ele == 'Educação Laboral') { // -->> para não confundir com uma outra disciplina que começe com Educação
                    newArray.push(" Ed.Lab");
                } else  if (ele == 'Educação Visual e Plástica') { // -->> para não confundir com uma outra disciplina que começe com Educação
                    newArray.push(" EVP");
                } else if (ele == 'Educação Moral e Cívica') { // -->> para não confundir com uma outra disciplina que começe com Educação
                    newArray.push(" EMC");
                } else if (ele == 'Actividades Lúdicas') {
                    newArray.push(" Act.Lúd")
                } else if (ele == 'Administração de Empresas') {
                    newArray.push(' Ad.Empr')
                } else if (ele == 'Aulas Práticas') {
                    newArray.push(' A.Prát');
                } else if (ele == 'Educação Manual e Plástica') {
                    newArray.push('EMP');
                } else if (ele == 'Biologia') {
                    newArray.push(" Bio");
                } else if (ele == 'Ciências da Natureza') {
                    newArray.push(' C.Nat');
                } else if (ele == 'Comunicação Linguística') {
                    newArray.push(' C.Ling');
                } else if (ele == 'Contabilidade Financeira') {
                    newArray.push(' C.Fina');
                } else if (ele == 'Desenho Técnico') {
                    newArray.push(' D.Téc')
                } else if (ele == 'Educação Física') {
                    newArray.push(' Ed.Fís');
                } else if (ele == 'Educação Musical') {
                    newArray.push(' Ed.Mús');
                } else if (ele == 'Empreendedorismo') {
                    newArray.push(' Empree');
                } else if (ele == 'Estudo do Meio') {
                    newArray.push(' E.Meio');
                } else if (ele == 'Expressão Musical') {
                    newArray.push(' Ex.Mús');
                } else if (ele == 'Iniciação à Informática') {
                    newArray.push(' In.Info');
                } else if (ele == 'Língua Inglesa') {
                    newArray.push(' L.Ing');
                } else if (ele == 'Meio Físico e Social') {
                    newArray.push(' MFS');
                } else if (ele == 'Projecto Tecnológico') {
                    newArray.push(' P.Técn');
                } else if (ele == 'Representação Matemática') {
                    newArray.push(' R.Mat');
                } else if (ele == 'T.Medições O') {
                    newArray.push(' TCO');
                } else if (ele == 'Técnicas de Topografia') {
                    newArray.push(' T.Topo');
                } else {
                    newArray.push(" "+ele.slice(0,shortIndex));
                }


            }

        })
        return newArray;
    }

    public processQualityData(arrayOfData : any[]) {

        console.log(arrayOfQlyData);

        if (arrayOfData.length != 0) {

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

        } else {
            return {
                'particapacao' : 'Sem dados',
                'iconePart' : 'fa fa-plug',
                'percentPart' :'0%',
                'avalicaoDisciplinar' : 'Sem dados',
                'iconeComport' : 'fa fa-plug',
                'percentComport' : '0%'
            }
        }
    }

    public processGradesData(arrayOfData : any[], classGrade : String) {
        //--> first group (notas >= 14); second group (positivas < 14); third group (negativas)
        var dataToReturn = [];
        var firstGroup = [], secondGroup = [], thirdGroup = [];

        // --> valores para o resumo do critério de notas
        var average = 0, percentOfGrades = 0;

        // --> pontuação global em %
        var pontGlobal = 100;

        for (let counter = 0; counter < arrayOfData.length; counter++) {

            if (arrayOfData[counter]['disciplina_nome'] != 'Avaliação Geral') {

                average += arrayOfData[counter]['pp1'];

                if (arrayOfData[counter]['pp1'] >= 10 && (classGrade != '5ª Classe' && classGrade != '6ª Classe')) {
                    percentOfGrades += 1;
                } else if (arrayOfData[counter]['pp1'] >= 5 && (classGrade == '5ª Classe' || classGrade == '6ª Classe')) {
                    percentOfGrades += 1;
                }

                if (arrayOfData[counter]['pp1'] >= 14 && (classGrade != '5ª Classe' && classGrade != '6ª Classe')) {
                    firstGroup.push(arrayOfData[counter]['disciplina_nome']);
                } else if (arrayOfData[counter]['pp1'] < 14 && arrayOfData[counter]['pp1'] >= 10 && (classGrade != '5ª Classe' && classGrade != '6ª Classe')) {
                    pontGlobal = pontGlobal - (100 / (arrayOfData.length - 1)) / 4;
                    secondGroup.push(arrayOfData[counter]['disciplina_nome']);
                } else if (arrayOfData[counter]['pp1'] < 10 && (classGrade != '5ª Classe' && classGrade != '6ª Classe')) {
                    pontGlobal = pontGlobal - 100 / (arrayOfData.length - 1);
                    thirdGroup.push(arrayOfData[counter]['disciplina_nome']);
                } else if (arrayOfData[counter]['pp1'] >= 7 && (classGrade == '5ª Classe' || classGrade == '6ª Classe')) {
                    firstGroup.push(arrayOfData[counter]['disciplina_nome']);
                } else if (arrayOfData[counter]['pp1'] < 7 && arrayOfData[counter]['pp1'] >= 5 && (classGrade == '5ª Classe' || classGrade == '6ª Classe')) {
                    pontGlobal = pontGlobal - (100 / (arrayOfData.length - 1)) / 4;
                    secondGroup.push(arrayOfData[counter]['disciplina_nome']);
                } else if (arrayOfData[counter]['pp1'] < 5 && (classGrade == '5ª Classe' || classGrade == '6ª Classe')) {
                    pontGlobal = pontGlobal - 100 / (arrayOfData.length - 1);
                    thirdGroup.push(arrayOfData[counter]['disciplina_nome']);
                }

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
                'vectorDasDisc': this.stringShortenerInArray(thirdGroup, 4).splice(0,4).toString()+((thirdGroup.length >= 4)?",...":"Sem Negativas Registadas"),
                'class' : 'negativas'
            });

        } else if (firstGroup.length == 0 && secondGroup.length > 0 && thirdGroup.length == 0) {
            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(secondGroup, 4).splice(0,4).toString()+((secondGroup.length >= 4)?",...":"."),
                'class' : 'positivasAbaixoDe14'
            });

            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(thirdGroup, 4).splice(0,4).toString()+((thirdGroup.length >= 4)?",...":"Sem Negativas Registadas"),
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
                'vectorDasDisc': 'Sem Positivas registadas',
                'class' : 'soAcimaDe14'
            });

            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(thirdGroup, 4).splice(0,4).toString()+((thirdGroup.length >= 4)?",...":"."),
                'class' : 'negativas'
            });
         } else if (firstGroup.length > 0 && secondGroup.length > 0 && thirdGroup.length == 0) {
            dataToReturn.push({
                'vectorDasDisc':  this.stringShortenerInArray(firstGroup.concat(secondGroup), 4).splice(0,4).toString()+((firstGroup.concat(secondGroup).length >= 4)?",...":"."),
                'class' : 'mixPositivas'
            });

            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(thirdGroup, 4).splice(0,4).toString()+((thirdGroup.length >= 4)?",...":"Sem Negativas Registadas"),
                'class' : 'negativas'
            });

        } else if (firstGroup.length > 0 && secondGroup.length == 0 && thirdGroup.length > 0) {
            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(firstGroup, 4).splice(0,4).toString()+((firstGroup.length >= 4)?",...":"."),
                'class' : 'soAcimaDe14'
            });

            dataToReturn.push({
                'vectorDasDisc': this.stringShortenerInArray(thirdGroup, 4).splice(0,4).toString()+((thirdGroup.length >= 4)?",...":"."),
                'class' : 'negativas'
            });
        }

        dataToReturn.push([
            {
                'mediaNotas' : {
                    'media' : Math.trunc(average / (arrayOfData.length - 1)),
                    'class' : (Math.trunc(average / (arrayOfData.length - 1)) >= 10 && (classGrade != '5ª Classe' && classGrade != '6ª Classe')) ?
                        (Math.trunc(average / (arrayOfData.length - 1)) >= 14 ? 'soAcimaDe14' : 'positivasAbaixoDe14') :
                        (Math.trunc(average / (arrayOfData.length - 1)) >= 5 && (classGrade == '5ª Classe' || classGrade == '6ª Classe')) ?
                        (Math.trunc(average / (arrayOfData.length - 1)) >= 7 ? 'soAcimaDe14' : 'positivasAbaixoDe14') : 'negativas'
                },
                'percentDeSucesso' : {
                    'percent':Math.trunc((percentOfGrades / (arrayOfData.length - 1 )) * 100),
                    'class' : Math.trunc((percentOfGrades / (arrayOfData.length - 1)) * 100) >= 50 ? 'soAcimaDe14' : 'negativas'
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

    public processFaultsData(arrayOfFaults : any[], numberOfSubjects : number, theClassFaults : any[], justiticativos : any[]) {

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
        pontGlobal = pontGlobal - (this.justiUtilSum(justiticativos) > 0 ? 1 : 0);

        pontGlobal = (pontGlobal < 0) ? 0 : pontGlobal;

        // --> o primeiro argumento deste objecto, será usado como valores para o constructor de um objecto gráfico para representação de faltas
        return {
            'toDisplay' : {
                'pesoDasFaltas' : this.justiUtilSum(justiticativos) + (this.justiUtilSum(justiticativos) != 1 ? ' Justificadas' : ' Justificada'),
                'discFaltosas' : nomeDisciplina.length > 0 ? this.stringShortenerInArray(nomeDisciplina, 4).splice(0,2).toString()+((nomeDisciplina.length > 2)?",...":".") : 'Sem disciplinas',
                'totalFaltas' : this.sumUtilFaults(faltasTotal, false)['totalFaltas'] + (this.sumUtilFaults(faltasTotal, false)['totalFaltas'] != 1 ? ' Registadas' : ' Registada')
            },
            'displayData' : this.sumUtilFaults(faltasTotal, false), 'pontuacaoGlobal' : Math.trunc(pontGlobal) + '%'
        }
    }

    private justiUtilSum(arrayOfData : any[]) {
        var totalFaltas = 0;
        if (arrayOfData.length > 0) {
            for (let counter = 0; counter < arrayOfData.length; counter++) {
                totalFaltas += arrayOfData[counter]['numeroFaltas'];
            }
        }
        return totalFaltas;
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


    public getGlobalScore(faults, grades, numbOfSub, allFaults, justificativos, classGrade) {
        var faltas : any = Number(this.processFaultsData(faults,numbOfSub,allFaults,justificativos)['pontuacaoGlobal'].split("%")[0]);
        var particapacao : any = Number(this.processQualityData(grades)['percentPart'].split("%")[0]);
        var comportamento : any = Number(this.processQualityData(grades)['percentComport'].split("%")[0]);
        var notas : any = Number(this.processGradesData(grades, classGrade)[2][0]['pontuacaoGlobal'].split("%")[0]);

        return Math.trunc((faltas + comportamento + particapacao + notas) / 4);
    }

    public _situacaoNotas(arrayOfData, faultsPoints) {

        var disciplinasEmAlta = [], disciplinasEmBaixa = [], disciplinasNoMeio = [];
        var informatica = 0, culinaria = 0, ingles = 0, teatro = 0, xadrez = 0;
        var resolucaoTarefas = -1, avaliacaoDisciplinar = "Sem dados";
        var evolucao = 'fa fa-times-circle';

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
                    resolucaoTarefas = 3;
                    pontuacaoGlobal -= 8;
               } else if (disciplina['resolucao_de_tarefas'] == 'Resolve Bem') {
                    resolucaoTarefas = 4;
                    pontuacaoGlobal -= 2;
               } else {
                    resolucaoTarefas = 5;
               }


               if (disciplina['evolucao'] == 'Evoluiu') {
                evolucao = 'fa fa-long-arrow-up'
               } else if (disciplina['evolucao'] == 'Decresceu') {
                evolucao = 'fa fa-long-arrow-down'
               } else {
                evolucao = 'fa fa-long-arrow-right'
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
        pontuacaoGlobal = pontuacaoGlobal - pontosFaltasDescontar;

        return {
            'disciplinasEmBaixa' : {
                'valor' : (disciplinasEmBaixa.length > 0) ?
                    this.stringShortenerInArray(disciplinasEmBaixa, 4).splice(0,4).toString()+((disciplinasEmBaixa.length >= 4)?" ,...":".") : 'Sem disciplinas'
            },
            'disciplinasEmAlta' : {
                'valor' : (disciplinasEmAlta.length > 0) ?
                    this.stringShortenerInArray(disciplinasEmAlta, 4).splice(0,4).toString()+((disciplinasEmAlta.length >= 4)?" ,...":".") : 'Sem disciplinas'
            },
            'disciplinasNoMeio' : {
                'valor' : (disciplinasNoMeio.length > 0) ?
                this.stringShortenerInArray(disciplinasNoMeio, 4).splice(0,4).toString()+((disciplinasNoMeio.length >= 4)?" ,...":".") : 'Sem disciplinas'
            },
            'disciplinasExtras' : {
                'culinaria' : (culinaria == 0) ? 'transparente' : (culinaria == -1) ? 'vermelho' : (culinaria == 2) ? 'verde' : 'laranja',
                'informatica' : (informatica == 0) ? { 'position':'absolute', 'top' : '30px', 'right' : '13px' , 'width.px':80, 'height.px' : '80', 'fill' : '#cbd1d8'} : (informatica == -1) ?
                { 'position':'absolute', 'top' : '30px', 'right' : '13px' , 'width.px':80, 'height.px' : '80', 'fill' : 'red'} : (informatica == 2) ?
                { 'position':'absolute', 'top' : '30px', 'right' : '13px' , 'width.px':80, 'height.px' : '80', 'fill' : 'green'} :
                { 'position':'absolute', 'top' : '30px', 'right' : '13px' , 'width.px':80, 'height.px' : '80', 'fill' : 'orange'},
                'ingles' : (ingles == 0) ? { 'position':'absolute', 'top' : '10px', 'right' : '13px' , 'width.px':80, 'height.px' : '80', 'fill' : '#cbd1d8'} : (ingles == -1) ?
                {'position':'absolute', 'top' : '10px', 'left':'8px', 'width.px':90, 'height.px' : '85', 'fill' : 'red'} : (ingles == 2) ?
                {'position':'absolute', 'top' : '10px', 'left':'8px', 'width.px':90, 'height.px' : '85', 'fill' : 'green'} :
                {'position':'absolute', 'top' : '10px', 'left':'8px', 'width.px':90, 'height.px' : '85', 'fill' : 'orange'},
                'xadrez' : (xadrez == 0) ? { 'position':'absolute', 'top' : '30px', 'right' : '13px' , 'width.px':35, 'height.px' : '40', 'fill' : '#cbd1d8'} : (xadrez == -1) ? { 'position':'absolute', 'left' : '55px', 'top' : '20px', 'width.px':40, 'height.px' : '40', 'fill' : 'red'} : (xadrez == 2) ?
                { 'position':'absolute', 'left' : '55px', 'top' : '20px', 'width.px':40, 'height.px' : '40', 'fill' : 'green'} :
                { 'position':'absolute', 'left' : '55px', 'top' : '20px', 'width.px':40, 'height.px' : '40', 'fill' : 'orange'},
                'teatro' : (teatro == 0) ? { 'position':'absolute', 'top' : '55px', 'left':'15px', 'width.px':35, 'height.px' : '40', 'fill' : '#cbd1d8' } : (teatro == -1) ? { 'position':'absolute', 'top' : '55px', 'left':'15px', 'width.px':35, 'height.px' : '40', 'fill' : 'red'}
                : (teatro == 2) ?
                { 'position':'absolute', 'top' : '55px', 'left':'15px', 'width.px':35, 'height.px' : '40', 'fill' : 'green'} :
                { 'position':'absolute', 'top' : '55px', 'left':'15px', 'width.px':35, 'height.px' : '40', 'fill' : 'orange'}
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
            'evolucao' : evolucao,
            'pontuacaoGlobal' : Math.trunc(pontuacaoGlobal / 5) + '%'
        }
    }


    // -> este método calcula o créscimento, decréscimo ou estaticidade de desempenho de um estudante no relatório académico
    public desempenhoComparativo(trimAnterior : any, esteTrimestre : any) {
      console.log(trimAnterior);
      console.log(esteTrimestre);

        if (trimAnterior.length > 0) {
            if (trimAnterior[0]['percentagem'] != -1) {
                return [
                    {data: [trimAnterior[0]['percentagem']], label: 'Iº Trimestre'},
                    {data: [esteTrimestre], label: 'IIº Trimestre'}

                ]
            } else {
                return [];
            }
        } else {
            return [];
        }
    }

    public aulasRecuperacao(arrayOfData : any[]) {
        var disciplinasRecupe : any[] = [];
        var dataToReturn : any[] = [];

        var grupoDeDois = 0;

        arrayOfData.forEach((disc)=>{
            if (disc['recuperacao']) {
                disciplinasRecupe.push(disc['disciplina_nome']);
            }
        });

        // criando o primeiro grupo
        dataToReturn.push([]);

        // divide em 2 grupos as disciplinas em recuperação
        disciplinasRecupe.forEach((disc)=>{

            if (grupoDeDois <= 1) {
                dataToReturn[dataToReturn.length-1].push(disc);
                grupoDeDois++;
            } else {

                // inicialize o construtor
                grupoDeDois = 0;

                // criar mais um grupo
                dataToReturn.push([]);

                dataToReturn[dataToReturn.length-1].push(disc);

                // incrementa o cont do grupo
                grupoDeDois++;

            }

        });

        return (dataToReturn[0].length == 0) ? [] : dataToReturn;
    }

}
