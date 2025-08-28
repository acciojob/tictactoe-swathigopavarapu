//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const formSection = document.getElementById("form-section");
const gameSection = document.getElementById("game-section");
const board = document.getElementById("board");
const messageDiv = document.querySelector(".message");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;

const winningCombos = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim();
  player2 = document.getElementById("player-2").value.trim();

  if (player1 === "" || player2 === "") {
    alert("Please enter both player names!");
    return;
  }

  formSection.classList.add("hidden");
  gameSection.classList.remove("hidden");

  currentPlayer = player1;
  currentSymbol = "X";
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

board.addEventListener("click", (e) => {
  if (!gameActive) return;

  const cell = e.target;
  if (!cell.classList.contains("cell") || cell.textContent !== "") return;

  cell.textContent = currentSymbol;

  if (checkWinner()) {
    messageDiv.textContent = `${currentPlayer}, congratulations you won! 🎉`;
    highlightWinner();
    gameActive = false;
    return;
  }

  // Switch turn
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "O";
  } else {
    currentPlayer = player1;
    currentSymbol = "X";
  }
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

function checkWinner() {
  return winningCombos.some(combo => {
    return combo.every(id => {
      return document.getElementById(id).textContent === currentSymbol;
    });
  });
}

function highlightWinner() {
  winningCombos.forEach(combo => {
    if (combo.every(id => document.getElementById(id).textContent === currentSymbol)) {
      combo.forEach(id => document.getElementById(id).classList.add("winner"));
    }
  });
}
