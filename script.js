class Calculadora {
  constructor() {
    this.nrVisor = "0";
    this.ptDecimal = false;
    this.iniciouSegundo = false;
    this.memTemp = "";
    this.estadoErro = false;
    this.memoria = 0;
    this.op = {
      NOP: 0,
      DIV: 1,
      MULT: 2,
      SUB: 3,
      SUM: 4,
      PORC: 5,
    };
    this.opAtual = this.op.NOP;
  }

  mostrarVisor() {
    if (this.estadoErro) {
      this.nrVisor = "0";
      return "ERRO!";
    }
    if (this.nrVisor.length == 0) {
      this.nrVisor = "0";
    }
    return this.nrVisor;
  }

  // recebe dígito
  digito(dig) {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    if (dig.length != 1) return;
    if ((dig < "0" || dig > "9") && dig != ".") return;
    if (!this.iniciouSegundo && this.opAtual != this.op.NOP) {
      this.iniciouSegundo = true;
      this.ptDecimal = false;
      this.nrVisor = "0";
    }
    if (this.nrVisor.length == 10) return;
    if (dig == ".") {
      if (this.ptDecimal) return;
      this.ptDecimal = true;
    }
    if (this.nrVisor == "0") {
      this.nrVisor = dig == "." ? "0." : dig;
    } else {
      this.nrVisor += dig;
    }
  }

  // Definir qual a operação atual
  defineOperacao(op) {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    switch (op) {
      case "+":
        this.opAtual = this.op.SUM;
        break;
      case "-":
        this.opAtual = this.op.SUB;
        break;
      case "*":
        this.opAtual = this.op.MULT;
        break;
      case "/":
        this.opAtual = this.op.DIV;
        break;
      case "%":
        this.opAtual = this.op.PORC;
    }
    this.memTemp = this.nrVisor;
  }

  // Executa operação: tecla IGUAL
  igual() {
    if (this.estadoErro) return;
    if (this.opAtual == this.op.NOP) return;
    let num1 = parseFloat(this.memTemp);
    let num2 = parseFloat(this.nrVisor);
    let resultado = 0;
    switch (this.opAtual) {
      case this.op.DIV:
        if (num2 == 0) {
          this.estadoErro = true;
          return;
        }
        resultado = num1 / num2;
        break;
      case this.op.MULT:
        resultado = num1 * num2;
        break;
      case this.op.SUB:
        resultado = num1 - num2;
        break;
      case this.op.SUM:
        resultado = num1 + num2;
        break;
      case this.op.PORC:
        resultado = num1 * (num2 / 100);
    }
    this.opAtual = this.op.NOP;
    this.iniciouSegundo = false;
    this.ptDecimal = false;
    this.memTemp = "";
    this.nrVisor = String(resultado).slice(0, 10);
    this.opAtual = this.op.NOP;
    this.estaLigada = true;
  }

  // Define o estado da calculadora como ligada
  on() {
    this.estaLigada = true;
    this.nrVisor = "0";
    this.memTemp = "";
    this.estadoErro = false;
    atualizaVisor();
  }

  // Define o estado da calculadora como desligada
  off() {
    this.estaLigada = false;
    this.nrVisor = "OFF";
    this.memoria = 0;
    atualizaVisor();
  }

  estaDesligada() {
    return !this.estaLigada;
  }

  // Limpa dados (exceto memória)
  teclaC() {
    if (this.estaDesligada()) return;
    this.nrVisor = "0";
    this.ptDecimal = false;
    this.iniciouSegundo = false;
    this.opAtual = this.op.NOP;
    this.memTemp = "";
    this.estadoErro = false;
  }

  // Tecla x2 : Quadrado do número
  quadradoNumero() {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    let quadrado = (this.nrVisor *= this.nrVisor);
    this.nrVisor = String(quadrado).slice(0, 10);
  }

  // tecla M+ : acrescenta à memória o número no visor
  teclaMmais() {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    this.memoria += parseFloat(this.nrVisor);
  }

  // tecla M- : subtrai da memória o número no visor
  teclaMmenos() {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    this.memoria -= parseFloat(this.nrVisor);
  }

  // tecla M+ : acrescenta à memória o número no visor
  teclaMmais() {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    this.memoria += parseFloat(this.nrVisor);
  }

  // tecla M- : subtrai da memória o número no visor
  teclaMmenos() {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    this.memoria -= parseFloat(this.nrVisor);
  }

  // tecla RM : recupera o conteúdo da memória -> coloca no visor
  teclaRM() {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    this.nrVisor = String(this.memoria);
  }

  // tecla CLM : limpa totalmente o conteúdo da memória -> atribui 0
  teclaCLM() {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    if (this.memoria !== 0) {
      this.memoria = 0;
    }
  }

  teclaRaiz() {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    let numero = parseFloat(this.nrVisor);
    if (numero < 0) {
      this.estadoErro = true;
      return;
    }
    let resultado = Math.sqrt(numero);
    this.nrVisor = String(resultado).slice(0, 10);
  }

  teclaInverso() {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    let numero = parseFloat(this.nrVisor);
    if (numero === 0) {
      this.estadoErro = true;
      return;
    }
    let resultado = 1 / numero;
    this.nrVisor = String(resultado).slice(0, 10);
  }

  teclaMaisMenos() {
    if (this.estadoErro) return;
    if (this.estaDesligada()) return;
    let numero = parseFloat(this.nrVisor);
    let resultado;
    if (numero > 0) {
      resultado = -numero;
      this.nrVisor = String(resultado).slice(0, 10);
    } else if (numero < 0) {
      resultado = -numero;
      this.nrVisor = String(resultado).slice(0, 10);
    }
  }
}

// ==================================================================
//  RESPOSTAS A EVENTOS DO HTML
// ==================================================================

// ATUALIZA O VALOR NO VISOR
let atualizaVisor = () => {
  document.getElementById("visor-id").innerHTML = calculadora.mostrarVisor();
};

// RECEBE UM DÍGITO (OU PONTO)
let digito = (dig) => {
  calculadora.digito(dig);
  atualizaVisor();
};

// RECEBE OPERAÇÃO ATUAL
let defOp = (op) => {
  if (calculadora.opAtual != calculadora.op.NOP) {
    defIgual();
    atualizaVisor();
  }
  calculadora.defineOperacao(op);
};

// CALCULA A OPERAÇÃO
let defIgual = () => {
  calculadora.igual();
  atualizaVisor();
};

// TECLA C: LIMPA TUDO, EXCETO MEMÓRIA
let teclaC = () => {
  calculadora.teclaC();
  atualizaVisor();
};

let onOf = () => {
  if (calculadora.estaLigada) {
    calculadora.off();
  } else {
    calculadora.on();
  }
};

// TECLA X2: MOSTRA NO VISOR O QUADRADO DO NÚMERO DIGITADO
let quadradoNumero = () => {
  calculadora.quadradoNumero();
  atualizaVisor();
};

// M+ ACRESCENTA À MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmais = () => {
  calculadora.teclaMmais();
};

// M- SUBTRAI DA MEMÓRIA O NÚMERO ATUAL NO VISOR
let teclaMmenos = () => {
  calculadora.teclaMmenos();
};

// PÕE NO VISOR O CONTEÚDO DA MEMÓRIA
let teclaRM = () => {
  calculadora.teclaRM();
  atualizaVisor();
};

// APAGA TODO O CONTEÚDO DA MEMÓRIA
let teclaCLM = () => {
  calculadora.teclaCLM();
};

let teclaRaiz = () => {
  calculadora.teclaRaiz();
  atualizaVisor();
};

let teclaInverso = () => {
  calculadora.teclaInverso();
  atualizaVisor();
};

let teclaMaisMenos = () => {
  calculadora.teclaMaisMenos();
  atualizaVisor();
};

// ========================================================
//  INÍCIO DO PROCESSAMENTO
// ========================================================

let calculadora = new Calculadora();
