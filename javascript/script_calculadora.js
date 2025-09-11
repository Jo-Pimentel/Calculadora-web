const visor_da_calculadora = document.querySelector("#visor_da_calculadora");

const numeros_disponiveis = [...document.querySelectorAll(".numero_disponivel")];

const operacoes_disponiveis = [...document.querySelectorAll(".operacao_disponivel")];

const botoes_complementares = [...document.querySelectorAll(".botao_complementar")];

const botao_resultado = document.querySelector("#botao_resultado");

let primeiro_numero, segundo_numero, acao_escolhida;

numeros_disponiveis.map((numero_disponivel) => {
    numero_disponivel.addEventListener("click", () => {
        visor_da_calculadora.disabled = false;

        visor_da_calculadora.value += numero_disponivel.textContent;

        visor_da_calculadora.disabled = true;
    })
})

function definir_acao_e_verificar_valores_existentes(botao_selecionado) {
    if(!acao_escolhida) {
        if(!primeiro_numero) {
            primeiro_numero = parseFloat(visor_da_calculadora.value);
                
            acao_escolhida = botao_selecionado.textContent;

            visor_da_calculadora.value = "";
        }
    }
}

operacoes_disponiveis.map((operacao_disponivel) => {
    operacao_disponivel.addEventListener("click", () => {
        definir_acao_e_verificar_valores_existentes(operacao_disponivel);
    })
})

function resetar_variaveis_de_numero_e_acao() {
    primeiro_numero = undefined;
    segundo_numero = undefined;
    acao_escolhida = undefined;
}

botoes_complementares.map((botao_complementar) => {
    botao_complementar.addEventListener("click", () => {
        switch(botao_complementar.textContent) {
            case ",":
                if(visor_da_calculadora.value != "") {
                    if(!visor_da_calculadora.value.includes(".")) {
                        visor_da_calculadora.value += ".";
                    }
                }
            break

            case "C":
                visor_da_calculadora.value = "";
            break

            case "CA":
                visor_da_calculadora.value = "";

                resetar_variaveis_de_numero_e_acao();
            break

            default:
                definir_acao_e_verificar_valores_existentes(botao_complementar);
            break

        }
    })
})

botao_resultado.addEventListener("click", () => {
    if(!segundo_numero && primeiro_numero) {
        if(visor_da_calculadora.value != "") {
            segundo_numero = parseFloat(visor_da_calculadora.value);
            
            switch(acao_escolhida) {
                case "+":
                    visor_da_calculadora.value = primeiro_numero + segundo_numero;
                break

                case "-":
                    visor_da_calculadora.value = primeiro_numero - segundo_numero;
                break

                case "x":
                    visor_da_calculadora.value = primeiro_numero * segundo_numero;
                break

                case "÷":
                    visor_da_calculadora.value = primeiro_numero / segundo_numero;
                break

                case "%":
                    visor_da_calculadora.value = (primeiro_numero / 100) * segundo_numero;
                break

                default:
                    if(primeiro_numero > segundo_numero) {
                        visor_da_calculadora.value = primeiro_numero;
                    } else {
                        visor_da_calculadora.value = segundo_numero;
                    }
                break
            }
            
            resetar_variaveis_de_numero_e_acao();
        }
    }
})