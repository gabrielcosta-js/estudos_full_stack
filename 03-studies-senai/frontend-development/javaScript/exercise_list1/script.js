function questao1(){
    const nome = "Gabriel Costa de Jesus";
    console.log(`Olá, ${nome} Seja bem-vindo(a) ao curso de JavaScript!`);
}
function questao2(){
    const idadeNascimento = 2005;
    const anoAtual = 2026;

    idade = anoAtual - idadeNascimento;

    console.log(`Sua idade atual é: ${idade} anos`);
}
function questao3(){
    const cidade = prompt("Digite a sua cidade");
    const estado = prompt("Digite seu estado");
    const pais = prompt("DIgite seu páis");
    
    alert(`Sua cidade é: ${cidade}, seu estado é: ${estado}, seu país é ${pais}`);
}
function questao4(){
    let temCarteira = true;
    console.log(typeof(temCarteira));
}
function questao5(){
    let saldo = 0;
    console.log(`Saldo Atual: ${saldo}`);
    console.log(`Depósito de 200`);
    saldo += 200;
    console.log(`Saldo Atual: ${saldo}`);
    console.log(`Saque de 50`);
    saldo -= 50;
    console.log(`Saldo Atual: ${saldo}`);
}
function questao6(){
    let matematica = 9;
    let portugues = 7;
    let ciencias = 8;

    media = (matematica+portugues+ciencias)/3; 

    console.log("Média", media);
}
function questao7(){
    let salario = 3000;
    salario = (salario * 0.1) + salario;

    console.log("Parabéns seu salário de 3000 recebeu um aumento de 10%");
    console.log(`Seu novo salário é: ${salario}`);

}

let clique = 0;
function questao8(){

    
    clique++;

    if(clique == 3) {
        console.log(`Fim da Simulação: ${clique}`);

    }
   

}