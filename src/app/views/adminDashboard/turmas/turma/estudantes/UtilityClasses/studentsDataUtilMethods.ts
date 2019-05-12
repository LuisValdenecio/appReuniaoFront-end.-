import {Injectable} from '@angular/core';

@Injectable()
export class StudentDataUtils {

    public processBehaviorData(arrayOfData : any[]) {
    

    }

    public processGradesData(arrayOfData : any[]) {
        //--> first group (notas >= 14); second group (positivas < 14); third group (negativas)
        var dataToReturn = [];    
        var firstGroup = [], secondGroup = [], thirdGroup = [];

        // --> contadores para inserção de subgrupos nos grupos
        var firstGroupCounter = 1, secondGroupCounter = 1, thirdGroupCounter = 1;

        // --> valores para o resumo do critério de notas
        var average = 0, percentOfGrades = 0; 

        // --> pontuação global em %
        var pontGlobal = 100;

        // --> cada grupo é composto de subgrupos de dois elementos
        firstGroup.push([]);
        secondGroup.push([]);
        thirdGroup.push([]);

        for (let counter = 0; counter < arrayOfData.length; counter++) {

            average += arrayOfData[counter]['pp1'];

            if (arrayOfData[counter]['pp1'] >= 10) {
                percentOfGrades += 1;
            }

            if (arrayOfData[counter]['pp1'] >= 14) {

                if (firstGroupCounter <= 2) {
                    firstGroup[firstGroup.length-1].push({'nomeDisciplina' : arrayOfData[counter]['disciplina_nome'], 'valor' : arrayOfData[counter]['pp1']})
                } else {
                    firstGroup.push([]);
                    firstGroup[firstGroup.length-1].push({'nomeDisciplina' : arrayOfData[counter]['disciplina_nome'], 'valor' : arrayOfData[counter]['pp1']})
                    firstGroupCounter = 1;
                }

                firstGroupCounter++;
            } else if (arrayOfData[counter]['pp1'] < 14 && arrayOfData[counter]['pp1'] >= 10) {

                pontGlobal = pontGlobal - ((100 / arrayOfData.length) / 2);    // -->> por cada positiva abaixo de 14 valores diminua 5 pontos

                if (secondGroupCounter <= 2) {
                    secondGroup[secondGroup.length-1].push({'nomeDisciplina' : arrayOfData[counter]['disciplina_nome'], 'valor' : arrayOfData[counter]['pp1']})
                } else {
                    secondGroup.push([]);
                    secondGroup[secondGroup.length-1].push({'nomeDisciplina' : arrayOfData[counter]['disciplina_nome'], 'valor' : arrayOfData[counter]['pp1']})
                    secondGroupCounter = 1;
                }
                secondGroupCounter++;

            } else {

                pontGlobal = pontGlobal - (100 / arrayOfData.length);   //-->> por cada negativa diminua 10 pontos na classificação global

                if (thirdGroupCounter <= 2) {
                    thirdGroup[thirdGroup.length-1].push({'nomeDisciplina' : arrayOfData[counter]['disciplina_nome'], 'valor' : arrayOfData[counter]['pp1']})
                } else {
                    thirdGroup.push([]);
                    thirdGroup[thirdGroup.length-1].push({'nomeDisciplina' : arrayOfData[counter]['disciplina_nome'], 'valor' : arrayOfData[counter]['pp1']})
                    thirdGroupCounter = 1;
                }
                thirdGroupCounter++;
            }
        }

        dataToReturn.push(firstGroup);
        dataToReturn.push(secondGroup);
        dataToReturn.push(thirdGroup);

        dataToReturn.push([
            {
                'mediaNotas' : Math.trunc(average / arrayOfData.length),
                'percentDeSucesso' : Math.trunc((percentOfGrades / arrayOfData.length) * 100),
                'numeroPositivas' : percentOfGrades,
                'numeroNegativas' : arrayOfData.length - percentOfGrades,
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

    public processFaultsData(arrayOfFaults : any[], numberOfSubjects : number) {

        var faltasAusencia = [], faltaMaterial = [], faltaDisciplinar = [] , nomeDisciplina = [], faltasTotal = [];

        // --> pontuação global em %
        var pontGlobal = 100;

        for (let counter = 0; counter < arrayOfFaults.length; counter++) {

            if (nomeDisciplina.indexOf(arrayOfFaults[counter]['disciplina_nome']) == -1) {

                // --> vector com as faltas por ausências
                faltasAusencia.push(
                    this.sumUtilFaults(arrayOfFaults.filter(data => data['disciplina_nome'] == arrayOfFaults[counter]['disciplina_nome']), true)['faltasAusencia']
                )

                // --> vector com as faltas por material
                faltaMaterial.push(
                    this.sumUtilFaults(arrayOfFaults.filter(data => data['disciplina_nome'] == arrayOfFaults[counter]['disciplina_nome']), true)['faltasMaterial']
                )

                // --> vector com as faltas por disciplina
                faltaDisciplinar.push(
                    this.sumUtilFaults(arrayOfFaults.filter(data => data['disciplina_nome'] == arrayOfFaults[counter]['disciplina_nome']), true)['faltasDisciplinar']
                )

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
        return {'forGraphData' : [nomeDisciplina, faltasAusencia, faltaMaterial, faltaDisciplinar], 'displayData' : this.sumUtilFaults(faltasTotal, false), 'pontuacaoGlobal' : Math.trunc(pontGlobal) + '%' }            
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

        return dadosARetornar;
    }




}