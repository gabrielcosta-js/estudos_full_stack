// 01) Crie uma função que dado dois valores (passados como parâmetros)
// mostre no console a soma, subtração, multiplicação e divisão desses valores.

const a = 10
const b = 2

// Função normal
function soma(a, b) {
	return a + b
}

function sub(a, b) {
	return a - b
}

function multi(a, b) {
	return a * b
}

// Arrow function
const divi = (a, b) => a / b

console.log(soma(a, b))
console.log(sub(a, b))
console.log(multi(a, b))
console.log(divi(a, b))
