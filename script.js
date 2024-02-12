// ----HTML Elements----
const operationDisplay = document.querySelector(".display .operation");
const resultDisplay = document.querySelector(".display .result");
const keypads = document.querySelector(".keypads");
const equalOperator = document.querySelector(".equal");

keypads.addEventListener("click", clickKeys);

// ----Calculator Logic----
let firstOperand = "";
let secondOperand = "";
let operator = "";
const MAX_DIGITS = 13;

function operate(symbol, a, b) {
	operationDisplay.textContent = `${firstOperand} ${operator} ${secondOperand}`;

	if (symbol === "+") {
		return add(a, b);
	} else if (symbol === "−") {
		return subtract(a, b);
	} else if (symbol === "×") {
		return multiply(a, b);
	} else if (symbol === "÷") {
		if (b === 0) {
			clearInput();
			resultDisplay.textContent = "Cannot divide by zero";
		} else {
			return divide(a, b);
		}
	}
}

function add(a, b) {
	firstOperand = a + b;
	resultDisplay.textContent = firstOperand;
}

function subtract(a, b) {
	firstOperand = a - b;
	resultDisplay.textContent = firstOperand;
}

function multiply(a, b) {
	firstOperand = a * b;
	resultDisplay.textContent = firstOperand;
}

function divide(a, b) {
	firstOperand = a / b;
	resultDisplay.textContent = firstOperand;
}

// ----Manipulation of the UI

function clickKeys(e) {
	const targetElement = e.target;

	if (targetElement.className.includes("number")) {
		storeOperands(targetElement);
	} else if (targetElement.className.includes("operator")) {
		storeOperator(targetElement);
	} else if (targetElement.className.includes("equal")) {
		clickEqualSign();
	} else if (targetElement.textContent === "AC") {
		clearInput();
	} else if (targetElement.textContent === "+/−") {
		toggleNegation();
	}
}

function clickEqualSign() {
	if (resultDisplay.textContent === "Cannot divide by zero") {
		clearInput();
	} else {
		equalOperator.classList.add("finalResult");
		operate(operator, +firstOperand, +secondOperand);
	}
}

function storeOperands(element) {
	if (operator === "") {
		storeFirstOperand(element);
	} else {
		storeSecondOperand(element);
	}
}

function storeFirstOperand(element) {
	if (firstOperand.length < MAX_DIGITS) {
		if (element.textContent === "." && firstOperand.includes(".")) {
			return;
		}
		firstOperand += element.textContent;
		resultDisplay.textContent = firstOperand;
	}
}

function storeSecondOperand(element) {
	if (secondOperand.length < MAX_DIGITS) {
		if (!equalOperator.className.includes("finalResult")) {
			if (element.textContent === "." && secondOperand.includes(".")) {
				return;
			}
			secondOperand += element.textContent;
			resultDisplay.textContent = secondOperand;
		} else {
			clearInput();
			storeFirstOperand(element);
		}
	}
}

function storeOperator(element) {
	if (element.className.includes("operator")) {
		if (equalOperator.className.includes("finalResult")) {
			equalOperator.classList.remove("finalResult");
			secondOperand = "";
			operator = element.textContent;
		} else {
			operate(operator, +firstOperand, +secondOperand);
			secondOperand = "";
			operator = element.textContent;
		}
	}
}

function toggleNegation() {
	if (firstOperand !== "" && resultDisplay.textContent == firstOperand) {
		firstOperand = -parseFloat(firstOperand);
		resultDisplay.textContent = firstOperand;
	} else if (
		secondOperand !== "" &&
		resultDisplay.textContent == secondOperand
	) {
		secondOperand = -parseFloat(secondOperand);
		resultDisplay.textContent = secondOperand;
	}
}

function clearInput() {
	operationDisplay.textContent = "";
	resultDisplay.textContent = "0";
	equalOperator.classList.remove("finalResult");
	firstOperand = "";
	secondOperand = "";
	operator = "";
}
