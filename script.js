class Calculadora {

    constructor() {
        //atributos da classe
        this.numeroVisor = '0';

        this.memoria = 0;
        this.memoriaAuxiliar = 0;

        this.estadoDeErro = false;
        this.pontoDecimal = false;

        this.segundoNumero = false;

        //ENUM em javascript. operações disponiveis.
        this.operacoes = {
            NOP: 0,
            SOMA: 1,
            SUBTRACAO: 2,
            MULTIPLICACAO: 3,
            DIVISAO: 4,
            MOD: 5,
            EXP: 6,
            RAIZ: 7
        }

        this.operacaoSelecionada = this.operacoes.NOP;
    }

    // metodos da classe
    mostraVisor() {
        return this.numeroVisor;
    }

    defineOperacao(op) {
        if (this.estadoDeErro) return;
        switch (op) {
            case '+':
                this.operacaoSelecionada = this.operacoes.SOMA;
                break;
            case '-':
                this.operacaoSelecionada = this.operacoes.SUBTRACAO;
                break;
            case '/':
                this.operacaoSelecionada = this.operacoes.DIVISAO;
                break;
            case '*':
                this.operacaoSelecionada = this.operacoes.MULTIPLICACAO;
                break;
            case 'mod':
                this.operacaoSelecionada = this.operacoes.MOD;
                break;
            case 'exp':
                    this.operacaoSelecionada = this.operacoes.EXP;
                    break;
            case 'raiz':
                    this.operacaoSelecionada = this.operacoes.RAIZ;
                    break;
        }
        this.memoriaAuxiliar = this.numeroVisor;
    }

    recebeDigito(dig) {
        if (this.estadoDeErro) return;
        if (dig.length != 1) return;
        if ((dig < '0' || dig > '9') && dig != '.') return;
        if (!this.segundoNumero && this.operacaoSelecionada != this.operacoes.NOP) {
            this.segundoNumero = true;
            this.pontoDecimal = false;
            this.numeroVisor = '0';
        }
        if (this.numeroVisor.length == 10) return;
        if (dig == '.') {
            if (this.pontoDecimal) return;
            this.pontoDecimal = true;
        }
        if (this.numeroVisor == '0') {
            this.numeroVisor = dig == '.' ? '0.' : dig;
        } else {
            this.numeroVisor += dig;
        }
    }

    igual() {
        if (this.estadoDeErro) return;
        if (this.operacaoSelecionada == this.operacoes.NOP) return;
        let num1 = parseFloat(this.memoriaAuxiliar);
        let num2 = parseFloat(this.numeroVisor);
        let resultado = 0;
        switch (this.operacaoSelecionada) {
            case this.operacoes.SOMA:
                resultado = num1 + num2;
                break;
            case this.operacoes.SUBTRACAO:
                resultado = num1 - num2;
                break;
            case this.operacoes.MULTIPLICACAO:
                resultado = num1 * num2;
                resultado = parseFloat(resultado.toFixed(7));  // Arredonda o resultado para evitar os erros ao multiplicar floating points.
                break;
            case this.operacoes.DIVISAO:
                if (num2 == 0) {
                    this.estadoDeErro = true;
                    this.numeroVisor = 'ERRO!';
                    return;
                }
                resultado = num1 / num2;
                break;
            case this.operacoes.MOD:
                resultado = num1%num2;
                break; 
            case this.operacoes.EXP:
                resultado = num1**num2;
                break;
                case this.operacoes.RAIZ: //o segundo numero indica o grau da raíz.
                    if (num1 < 0 && num2 % 2 === 0) // não há raiz real de um número negativo quando o grau da raiz é par.
                     {
                        this.estadoDeErro = true;
                        this.numeroVisor = 'ERRO!';
                        return;
                    }
                    resultado = Math.pow(num1, 1/num2);
                    break;
        }
        this.operacaoSelecionada = this.operacoes.NOP;
        this.pontoDecimal = false;
        this.memoriaAuxiliar = '';
        this.segundoNumero = false;
        this.numeroVisor = String(resultado).slice(0, 10);
    }

    // Tecla C - reinicia tudo, exceto memória
    teclaC() {
        this.numeroVisor = '0';
        this.pontoDecimal = false;
        this.segundoNumero = false;
        this.operacaoSelecionada = this.operacoes.NOP;
        this.memoriaAuxiliar = '';
        this.estadoDeErro = false;
    }

    // tecla M+ : acrescenta à memória o número no visor
    teclaMmais() {
        if (this.estadoDeErro) return;
        this.memoria += parseFloat(this.numeroVisor);
    }

    // tecla M- : subtrai da memória o número no visor
    teclaMmenos() {
        if (this.estadoDeErro) return;
        this.memoria -= parseFloat(this.numeroVisor);
    }

    // tecla RM : recupera o conteúdo da memória -> coloca no visor
    teclaRM() {
        if (this.estadoDeErro) return;
        this.numeroVisor = String(this.memoria);
    }

    // tecla CLM : limpa totalmente o conteúdo da memória -> atribui 0
    teclaCLM() {
        if (this.estadoDeErro) return;
        this.memoria = 0;
    }
}

// ===================================================================
//  REAÇÃO A EVENTOS DO MOUSE
// ===================================================================

// ATUALIZA O VALOR NO VISOR
let mostraVisor = () => {
    document.getElementById('visor-id').innerHTML = calculadora.numeroVisor;
}

// RECEBE UM DÍGITO (OU PONTO)
let digito = (dig) => {
    calculadora.recebeDigito(dig);
    mostraVisor();
}

// RECEBE A OPERAÇÃO ATUAL
let defOp = (op) => {
    if (calculadora.operacaoSelecionada != calculadora.operacoes.NOP) {
        igual();
        mostraVisor();
    }
    calculadora.defineOperacao(op);
}

// CALCULA A OPERAÇÃO
let igual = () => {
    calculadora.igual();
    mostraVisor();
}

// TECLA C: LIMPA TUDO, EXCETO MEMÓRIA
let teclaC = () => {
    calculadora.teclaC();
    mostraVisor();
}

// M+ ACRESCENTA À MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmais = () => {
    calculadora.teclaMmais();
}

// M- SUBTRAI DA MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmenos = () => {
    calculadora.teclaMmenos();
}

// PÕE NO VISOR O CONTEÚDO DA MEMÓRIA
let teclaRM = () => {
    calculadora.teclaRM();
    mostraVisor();
}

// APAGA TODO O CONTEÚDO DA MEMÓRIA
let teclaCLM = () => {
    calculadora.teclaCLM();
}



// ===================================================================
//  INÍCIO DO PROCESSAMENTO
// ===================================================================
let calculadora = new Calculadora();