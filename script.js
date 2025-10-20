// ------------------------------------
// 1. VARIÁVEIS GLOBAIS
// ------------------------------------

const txt_cep = document.querySelector("#cep");

// ------------------------------------
// 2. FUNÇÕES DE LÓGICA
// ------------------------------------

function consultaCEP() {
    alert("oi");
}

// ------------------------------------
// 3. ESTRUTURAS DE EVENTOS E INÍCIO
// ------------------------------------

txt_cep.addEventListener("keyup", consultaCEP);
 
jQuery(function($) {
    $("#cep").mask("99999-999");
});