const conteudo_visor_da_calculadora = document.querySelector("#conteudo_visor_da_calculadora");

const numeros_disponiveis = [...document.querySelectorAll(".numero_disponivel")];

const operacoes_disponiveis = [...document.querySelectorAll(".operacao_disponivel")];

const botoes_complementares = [...document.querySelectorAll(".botao_complementar")];

const botao_resultado = document.querySelector("#botao_resultado");

let primeiro_numero, segundo_numero, acao_escolhida;

numeros_disponiveis.map((numero_disponivel) => {
    numero_disponivel.addEventListener("click", () => {
        conteudo_visor_da_calculadora.textContent += numero_disponivel.textContent;
    })
})

function definir_acao_e_verificar_valores_existentes(botao_selecionado) {
    if(!acao_escolhida) {
        if(!primeiro_numero) {
            primeiro_numero = parseFloat(conteudo_visor_da_calculadora.textContent);
                
            acao_escolhida = botao_selecionado.textContent;

            conteudo_visor_da_calculadora.textContent = "";
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
                if(conteudo_visor_da_calculadora.textContent != "") {
                    if(!conteudo_visor_da_calculadora.textContent.includes(".")) {
                        conteudo_visor_da_calculadora.textContent += ".";
                    }
                }
            break

            case "C":
                conteudo_visor_da_calculadora.textContent = "";
            break

            case "CA":
                conteudo_visor_da_calculadora.textContent = "";

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
        if(conteudo_visor_da_calculadora.textContent != "") {
            segundo_numero = parseFloat(conteudo_visor_da_calculadora.textContent);
            
            switch(acao_escolhida) {
                case "+":
                    conteudo_visor_da_calculadora.textContent = primeiro_numero + segundo_numero;
                break

                case "-":
                    conteudo_visor_da_calculadora.textContent = primeiro_numero - segundo_numero;
                break

                case "x":
                    conteudo_visor_da_calculadora.textContent = primeiro_numero * segundo_numero;
                break

                case "÷":
                    conteudo_visor_da_calculadora.textContent = primeiro_numero / segundo_numero;
                break

                case "%":
                    conteudo_visor_da_calculadora.textContent = (primeiro_numero / 100) * segundo_numero;
                break

                default:
                    if(primeiro_numero > segundo_numero) {
                        conteudo_visor_da_calculadora.textContent = primeiro_numero;
                    } else {
                        conteudo_visor_da_calculadora.textContent = segundo_numero;
                    }
                break
            }

            resetar_variaveis_de_numero_e_acao();
        }
    }
})