class Calculadora {


    constructor() {
        //atributos
        this.numeroVisor = 'null';

    }

    mostrarNoVisor(numero) {
        // Converte o número para string
        let numeroStr = numero.toString();

        // Remove o ponto decimal (se houver) para não contar como dígito
        let numeroSemPonto = numeroStr;

        // Verifica primeiro se o número sem ponto e sinal tem mais de 10 dígitos
        if (numeroSemPonto.length > 10) {
            this.numeroVisor = "Erro";
        } else {
            // Se o número for válido, atualiza o visor com o número original formatado
            this.numeroVisor = numeroStr;
        }

        // Atualiza o visor com o valor de numeroVisor
        document.getElementById('visor').innerText = this.numeroVisor;
    }
}

//====================================================//
//essa parte é dedicada para reação a eventos do mouse
//====================================================//

let calculadora = new Calculadora();


