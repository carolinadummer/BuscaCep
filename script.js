// ------------------------------------
// 1. VARIÁVEIS GLOBAIS
// ------------------------------------

const txt_cep = document.querySelector("#cep");
const txt_cidade = document.querySelector("#cidade");
const txt_bairro = document.querySelector("#bairro");
const txt_rua = document.querySelector("#rua");
const txt_num = document.querySelector("#numero");

const loadingOverlay = document.querySelector("#loadingOverlay");

// ------------------------------------
// 2. FUNÇÕES DE LÓGICA
// ------------------------------------

function consultaCEP() {
    // Lê o CEP digitado no campo "CEP" da página
    // para a variável 'cep'.
    let cep = txt_cep.value;
    
    // Verifica se o CEP digitado corresponde ao padrão '00000-000',
    // Ou seja, se é um CEP válido.
    if (txt_cep.value.match(/^\d{5}-\d{3}$/)) {
        // alert("CEP válido: "+cep);
        
        // Uma API permite que a gente obtenha informações
        // sem sair da página HTML atual.
        // Nosso objetivo é obter as informações do CEP digitado.
        // A URL da API de CEP possui o seguinte formato: 
        // https://viacep.com.br/s/12345123/json/
        // Onde "12345123" é o CEP (sem traço, apenas números).
        // alert("CEP válido: "+txt_cep.value);
        
        // Remove o "-" (traço) da variável 'cep'.
        cep = cep.replace("-", "");

        // Exibe o spinner de 'Carregando'
        loadingOverlay.classList.add('d-flex');
        loadingOverlay.classList.remove('d-none');
        
        fetch('https://viacep.com.br/ws/'+cep+'/json/')
        .then(function(response) {
            // Oculta o spinner de 'Carregando' ao receber a resposta da API
            loadingOverlay.classList.add('d-none');
            loadingOverlay.classList.remove('d-flex');

            // Converte a resposta para JSON.
            return response.json();
        })
        .then(function(jsonResponse) {
            // Exibe a resposta convertida da API na console do navegador web.
            console.log(jsonResponse);
            
            // A API da viaCEP retorna a chave 'erro' quando o CEP
            // digitado é inválido.
            if (jsonResponse.erro) {
                console.log("CEP inválido!");
                // Exibe a mensagem de "CEP inválido!" abaixo do campo de CEP.
                txt_cep.classList.add("is-invalid");
            } else {
                // Remove a mensagem de "CEP inválido!" abaixo do campo de CEP (se existir).
                txt_cep.classList.remove("is-invalid");
                // Preencha os campos de texto com as informções retornadas pela API.
                txt_cidade.value = jsonResponse.localidade;
                txt_bairro.value = jsonResponse.bairro;
                txt_rua.value = jsonResponse.logradouro;
            }
        });
        
        
    }
}

// ------------------------------------
// 3. ESTRUTURAS DE EVENTOS E INÍCIO
// ------------------------------------

txt_cep.addEventListener("keyup", consultaCEP);

jQuery(function($) {
    $("#cep").mask("99999-999");
});