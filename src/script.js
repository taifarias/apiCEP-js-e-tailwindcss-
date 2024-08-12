const inputCEP = document.getElementById('inputCEP');
const inputRua = document.getElementById('inputRua');
const inputNum = document.getElementById('inputNum');
const inputCompl = document.getElementById('inputCompl');
const inputBairro = document.getElementById('inputBairro');
const inputCidade = document.getElementById('inputCidade');
const inputEstado = document.getElementById('inputEstado');
const buttonComplete = document.getElementById('buttonComplete');



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
  
    if(inputValue.length === 8){
        console.log(inputValue);
        getAdress(inputValue);
    }
});

const getAdress = async (cep) => {
  

    inputCEP.blur();
    const apiUrl =`https://viacep.com.br/ws/${cep}/json/`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    console.log(data)


    if(data.erro === "true") {
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


buttonComplete.addEventListener("click", (e) => {
    if(inputRua === "") {
        alert('Endereço cadastrado com sucesso!');

        inputCEP.value = "";

    }
    
})

const toggleDisabled = () => {
    if(inputRua !== "") {
       inputRua.toggleAttribute('disabled');
       inputNum.toggleAttribute('disabled');
       inputCompl.toggleAttribute('disabled');
       inputBairro.toggleAttribute('disabled');
       inputCidade.toggleAttribute('disabled');
       inputEstado.toggleAttribute('disabled');

        
    }
}

