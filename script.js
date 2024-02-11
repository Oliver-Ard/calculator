const displayOperation = document.querySelector(".display .operation");
const displayResult = document.querySelector(".display .result");
const keypads = document.querySelector(".keypads");

let operandOne;
let operandTwo;
let operator;

function operate(symbol, num1, num2) {
	if (symbol === "+") {
		return add(num1, num2);
	} else if (symbol === "-") {
		return subtract(num1, num2);
	} else if (symbol === "*") {
		return multiply(num1, num2);
	} else if (symbol === "/") {
		return divide(num1, num2);
	}
}

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	return num1 / num2;
}

function checkKeyPads(e) {
	if (e.target.className.includes("number")) {
		console.log(e.target.textContent);
	}
}

keypads.addEventListener("click", checkKeyPads);
