// Wait for DOM to load before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "submit") {
        checkAnswer();
      } else {
        let gameType = this.getAttribute("data-type");
        runGame(gameType);
      }
    });
  }

  runGame("addition");
});

// a docstring shows a pop up when the function is hovered over in a different place in the doc - it serves as a quick reminder of the funciton role.

/**
 * The main game "loop", called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
  // creates two random numbers between 1 and 25
  let num1 = Math.floor(Math.random() * 25) + 1;
  let num2 = Math.floor(Math.random() * 25) + 1;

  // two or three equal signs are a comparison operator (comparing two+ values), one equal sign is an assignment operator (assigns a value)
  if (gameType === "addition") {
    displayAdditionQuestion(num1, num2);
  } else if (gameType === "multiply") {
    displayMultiplyQuestion(num1, num2);
  } else {
    alert(`Unknown game type: ${gameType}`);
    // throw statement will stop the game from running & show an error message in the console
    throw `Unknown game type: ${gameType}. Aborting!`;
  }
}

/**
 * checks the answer against the first element in
 * the returned calculateCorrectAnswer array
 */
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];
  if (isCorrect) {
    alert("Hey! You got it right! :D");
    incrementScore();
  } else {
    alert(`Awwww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}!`);
    incrementWrongAnswer();
}

  runGame(calculatedAnswer[1]);
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer.
 */
function calculateCorrectAnswer() {
  // gets the operands (the numbers) and the operator (plus, minus etc) directly from the dom
  // parseInt converts the string into a number (integer)
  let operand1 = parseInt(document.getElementById("operand1").innerText);
  let operand2 = parseInt(document.getElementById("operand2").innerText);
  let operator = document.getElementById("operator").innerText;

  if (operator === "+") {
    return [operand1 + operand2, "addition"];
  } 
  else if (operator === "x") {
    return [operand1 * operand2, "multiply"];
  } 
  else {
    alert(`Unimplemented operator ${operator}`);
    // throw statement will stop the game from running & show an error message in the console
    throw `Unimplemented operator ${operator}. Aborting!`;
  }
}

/**
 * gets the current score from the DOM and increments it by 1
 */
function incrementScore() {

  let oldScore = parseInt(document.getElementById("score").innerText);
  // generally speaking, innertext & textContent are interchangeable with some small differences
  // compound addition operator (+=) adds the value of the right operand to a variable and assigns the result to the variable
  document.getElementById("score").innerText = ++oldScore;

}

/**
 * gets the current tally of incorrect answers from the DOM and increments it by 1
 */
function incrementWrongAnswer() {

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    // generally speaking, innertext & textContent are interchangeable with some small differences
    // compound addition operator (+=) adds the value of the right operand to a variable and assigns the result to the variable
    document.getElementById("incorrect").innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion() {}

function displayMultiplyQuestion(operand1, operand2) {

  document.getElementById("operand1").textContent = operand1;
  document.getElementById("operand2").textContent = operand2;
  document.getElementById("operator").textContent = "x";
}
