const buttons = document.querySelectorAll(".button-option");
const messageDiv = document.createElement("div");
messageDiv.classList.add("message");
document.body.appendChild(messageDiv);

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellPlayed(clickedButton, index) {
  gameState[index] = currentPlayer;
  clickedButton.innerText = currentPlayer;
  clickedButton.style.color = currentPlayer === "X" ? "#1F316F" : "#982B1C";
}

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    messageDiv.innerText = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    messageDiv.innerText = "It's a Tie!";
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function handleCellClick(clickedButton, index) {
  if (gameState[index] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedButton, index);
  handleResultValidation();
}

function handleRestartGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  buttons.forEach((button) => {
    button.innerText = "";
  });
  messageDiv.innerText = "";
}

buttons.forEach((button, index) => {
  button.addEventListener("click", () => handleCellClick(button, index));
});

const restartButton = document.createElement("button");
restartButton.innerText = "Restart Game";
restartButton.classList.add("restart-button");
restartButton.addEventListener("click", handleRestartGame);
document.body.appendChild(restartButton);
