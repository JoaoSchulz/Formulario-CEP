const cep = document.querySelector('#cep');
const rua = document.querySelector('#rua');
const bairro = document.querySelector('#bairro');
const cidade = document.querySelector('#cidade');
const uf = document.querySelector('#uf');
const ibge = document.querySelector('#ibge');
const ddd = document.querySelector('#ddd');

cep.addEventListener('blur', function(e){
    let cep = e.target.value;
    limparInput();
    let script = document.createElement('script');
    script.src = 'https://viacep.com.br/ws/'+cep+'/json/?callback=popularForm';
    addLoading();
    document.body.appendChild(script);
    if(cep === ''){
        removLoading();
    }
});

function popularForm(resposta){

    if("erro" in resposta){
        setErrorFor(cep,'CEP não encontrado')
        removLoading();
    }else{
        setSuccessFor(cep)
        removLoading();
    }

    rua.value = resposta.logradouro;
    bairro.value = resposta.bairro;
    cidade.value = resposta.localidade;
    uf.value = resposta.uf;
    ibge.value = resposta.ibge;
    ddd.value = resposta.ddd;
}

function setErrorFor(input, message) {

    const aux = input.parentElement;
    const small = aux.querySelector('small')
    small.innerText = message
    aux.className = 'form-control error'
}

function setSuccessFor(input) {

    const aux = input.parentElement;
    aux.className = 'form-control success'
}

function addLoading(){
    var recebeSpan = document.querySelectorAll('.loading');
    for(var i = 0; i < recebeSpan.length; i++) {
        recebeSpan[i].classList.add('loadingVisible');
        
    }
}

function removLoading(){
    var recebeSpan = document.querySelectorAll('.loading');
    for(var i = 0; i < recebeSpan.length; i++) {
    recebeSpan[i].classList.remove('loadingVisible');
    }
}

function limparInput(){

    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('uf').value = '';
    document.getElementById('ibge').value = '';
    document.getElementById('ddd').value = '';
}