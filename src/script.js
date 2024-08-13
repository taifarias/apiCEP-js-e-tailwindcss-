const inputCEP = document.getElementById('inputCEP');
const inputRua = document.getElementById('inputRua');
const inputNum = document.getElementById('inputNum');
const inputCompl = document.getElementById('inputCompl');
const inputBairro = document.getElementById('inputBairro');
const inputCidade = document.getElementById('inputCidade');
const inputEstado = document.getElementById('inputEstado');
const buttonComplete = document.getElementById('buttonComplete');



const getAdress = async (cep) => { 

    const apiUrl =`https://viacep.com.br/ws/${cep}/json/`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data)


    if(data.erro) {
        inputCEP.value = "";
        alert("CEP invalido")

        

        return;
    }

    inputRua.value = data.logradouro;
    inputBairro.value = data.bairro;
    inputCidade.value = data.localidade;   
    inputEstado.value = data.uf

    toggleDisabled();
}

const toggleDisabled = () => {
    if(inputRua.value.trim() !== "") {
       
        inputNum.removeAttribute('disabled');
        inputCompl.removeAttribute('disabled');
          
    } else {
        // Desabilita os campos se a rua estiver vazia
        inputNum.setAttribute('disabled', 'true');
        inputCompl.setAttribute('disabled', 'true');
    }
}

const clearInputs = () => {
    inputRua.value = "";
    inputBairro.value = "";
    inputCidade.value = "";
    inputEstado.value = "";
}


inputCEP.addEventListener('keypress', (e) => {
    
    const onlyNumbers = /[0-9]/;
   
   //console.log(e.key);
    
   if(!onlyNumbers.test(e.key)){
    e.preventDefault();
    return;
   }
  });


inputCEP.addEventListener('keyup', (e) => {
    const inputValue = e.target.value;
  
    if(inputValue.length === 8){    //executar quando tiver 8 digitos
        console.log(inputValue);
     getAdress(inputValue);
    }
    else{
        clearInputs();

        toggleDisabled();

    }
});


buttonComplete.addEventListener("click", (e) => {

    if(inputNum.value.trim() === "" || inputCompl.value.trim() === "") {
        alert('Endereço não preenchido!');
        return;
    }
   
    
    alert('Endereço cadastrado com sucesso!');
    clearInputs();  
    inputNum.value = "";
    inputCEP.value = "";
    inputCompl.value = "";
    toggleDisabled();



})


