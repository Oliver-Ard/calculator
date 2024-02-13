// ----HTML Elements----
const operationDisplay = document.querySelector(".display .operation");
const resultDisplay = document.querySelector(".display .result");
const keypad = document.querySelector(".keypad");
const equalOperator = document.querySelector(".equal");

keypad.addEventListener("click", clickKeys);

// ----Calculator Logic----
let firstOperand = "";
let secondOperand = "";
let operator = "";
const MAX_DIGITS = 13;

function operate(symbol, a, b) {
	operationDisplay.textContent = `${firstOperand} ${operator} ${secondOperand}`;

	switch (symbol) {
		case "+": {
			add(a, b);
			break;
		}
		case "−": {
			subtract(a, b);
			break;
		}
		case "×": {
			multiply(a, b);
			break;
		}
		case "÷": {
			if (b === 0) {
				clearInput();
				resultDisplay.textContent = "Cannot divide by zero";
			} else {
				divide(a, b);
			}
			break;
		}
	}
	// Second Operand needs to be empty before another equation
	secondOperand = "";
}

function add(a, b) {
	firstOperand = a + b;
	updateDisplay(firstOperand);
}

function subtract(a, b) {
	firstOperand = a - b;
	updateDisplay(firstOperand);
}

function multiply(a, b) {
	firstOperand = a * b;
	updateDisplay(firstOperand);
}

function divide(a, b) {
	firstOperand = a / b;
	updateDisplay(firstOperand);
}

// ----Manipulation of the UI----

function clickKeys(e) {
	const targetElement = e.target;

	if (targetElement.dataset.number) {
		storeOperands(targetElement);
	} else if (targetElement.dataset.operation) {
		storeOperator(targetElement);
	} else if (targetElement.dataset.key === "=") {
		equalOperator.classList.add("finalResult");
		operate(operator, +firstOperand, +secondOperand);
	} else if (targetElement.dataset.key === "AC") {
		clearInput();
	} else if (targetElement.dataset.key === "+/−") {
		toggleNegation();
	}
}

function storeOperands(element) {
	// This condition is here because we need to store the result of the equation in the first operand. So this will ensure that we can store new numbers just when the operator is empty, more exactly when we clear the input.
	if (operator === "") {
		storeFirstOperand(element);
	} else {
		storeSecondOperand(element);
	}
}

function storeFirstOperand(element) {
	// We check the length of the number we type to ensure it has a limit so as not to break on the other lines.
	if (firstOperand.length < MAX_DIGITS) {
		// This condition is for the period not to be typed more than once if one period exists in the operand.
		if (element.dataset.number === "." && firstOperand.includes(".")) {
			return;
		}
		firstOperand += element.dataset.number;
		updateDisplay(firstOperand);
	}
}

function storeSecondOperand(element) {
	// Same here for the length condition.
	if (secondOperand.length < MAX_DIGITS) {
		if (!equalOperator.className.includes("finalResult")) {
			// Same here for the period condition.
			if (element.textContent === "." && secondOperand.includes(".")) {
				return;
			}
			secondOperand += element.dataset.number;
			updateDisplay(secondOperand);
		} else {
			clearInput();
			storeFirstOperand(element);
		}
	}
}

function storeOperator(element) {
	// We need to have a class for the equal button to manage that we can chain multiple operations before we can click the equal button.
	if (!equalOperator.className.includes("finalResult")) {
		operate(operator, +firstOperand, +secondOperand);
		operator = element.dataset.operation;
	} else {
		equalOperator.classList.remove("finalResult");
		operator = element.dataset.operation;
	}
}

function updateDisplay(result) {
	resultDisplay.textContent = result;
}

function toggleNegation() {
	if (firstOperand !== "" && resultDisplay.textContent == firstOperand) {
		firstOperand = -parseFloat(firstOperand);
		updateDisplay(firstOperand);
	} else {
		secondOperand = -parseFloat(secondOperand);
		updateDisplay(secondOperand);
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
