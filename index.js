const gameWrapper = document.querySelector(".wrapper");

function gamePlayers(player, marker) {
  this.player = player;
  this.marker = marker;

  return { player, marker };
}

const player1 = gamePlayers("manish", "x");
const player2 = gamePlayers("shubam", "0");

let currentPlayer = player1;

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2], //first row
  [3, 4, 5], //second row
  [6, 7, 8], //third row
  [0, 3, 6], //first col
  [1, 4, 7], //second col
  [2, 5, 8], //third col
  [0, 4, 8], //left-to-right diag
  [2, 4, 6], //right-to-left diag
];

function createBoard() {
  drawBoard();
}

function drawBoard() {
  for (let i = 1; i <= 9; i++) {
    const boardBoxes = document.createElement("button");
    boardBoxes.id = `${i}`;
    boardBoxes.classList.add("board-boxes");

    boardBoxes.addEventListener("click", (e) => {
      if (e.target.textContent !== "") {
        alert("Please choose a different box!");
      }

      currentPlayer = currentPlayer === player1 ? player2 : player1;

      boardBoxes.textContent = currentPlayer.marker;
    });
    gameWrapper.appendChild(boardBoxes);
  }
}

createBoard();
