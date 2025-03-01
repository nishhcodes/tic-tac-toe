const scoreBoard = document.querySelector(".score-board");
const gameWrapper = document.querySelector(".wrapper");
const info = document.querySelector(".info-container");
const matchDetails = document.querySelector(".match-details");
const firstPlayer = document.querySelector("#first_player_name");
const secondPlayer = document.querySelector("#second_player_name");
const playerOne = document.querySelector("#player1");
const playerTwo = document.querySelector("#player2");
const firstPlayerScore = document.querySelector("#player_one_score");
const secondPlayerScore = document.querySelector("#player_two_score");

let playerOneScore = 0;
let playerTwoScore = 0;

function gamePlayers(player, marker) {
  this.player = player;
  this.marker = marker;

  return { player, marker };
}

let player1, player2;
let currentPlayer;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2], // first row
  [3, 4, 5], // second row
  [6, 7, 8], // third row
  [0, 3, 6], // first col
  [1, 4, 7], // second col
  [2, 5, 8], // third col
  [0, 4, 8], // left-to-right diag
  [2, 4, 6], // right-to-left diag
];

function drawBoard() {
  info.style.display = "none";
  document.body.appendChild(scoreBoard);

  matchDetails.textContent = `${currentPlayer.player} turn!`;

  for (let i = 0; i <= 8; i++) {
    const boardBoxes = document.createElement("button");
    boardBoxes.id = `${i}`;
    boardBoxes.classList.add("board-boxes");

    boardBoxes.addEventListener("click", (e) => {
      const clickedBoxIndex = parseInt(e.target.id);

      if (gameState[clickedBoxIndex] !== "") {
        alert("Please choose a different box!");
        return;
      }

      gameState[clickedBoxIndex] = currentPlayer.marker;
      e.target.textContent = currentPlayer.marker;

      const winner = checkWin();
      if (winner) {
        winner.forEach((index) => {
          const winningCell = document.getElementById(index);
          winningCell.classList.add("win-style");
          winningCell.style.color = "#fff";
        });
        setTimeout(() => {
          if (e.target.textContent === "X") {
            playerOneScore++;
            firstPlayerScore.textContent = playerOneScore;
          } else {
            playerTwoScore++;
            secondPlayerScore.textContent = playerTwoScore;
          }
          console.log(parseInt(playerOneScore));
          console.log(parseInt(playerTwoScore));
          resetBoard();
        }, 300);

        matchDetails.textContent = `${currentPlayer.player} wins!`;
        return;
      }

      if (gameState.every((cell) => cell !== "")) {
        setTimeout(() => {
          matchDetails.textContent = `It's a draw!`;
          resetBoard();
        }, 300);
      }

      currentPlayer = currentPlayer === player1 ? player2 : player1;

      if (currentPlayer === player1) {
        matchDetails.textContent = `${currentPlayer.player}'s turn!`;
        matchDetails.classList.add("turn-item");
        e.target.classList.add("active");
      } else {
        matchDetails.textContent = `${currentPlayer.player}'s turn!`;
        matchDetails.classList.add("turn-item");
        e.target.classList.add("active");
      }
    });

    gameWrapper.appendChild(boardBoxes);
  }
}

function checkWin() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      gameState[a] !== "" &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return combination;
    }
  }
  return false;
}

function resetBoard() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameWrapper.innerHTML = "";
  matchDetails.textContent = "";
  currentPlayer = player1;
  drawBoard();
}

document.getElementById("play").addEventListener("click", (e) => {
  e.preventDefault();

  const player1Name = firstPlayer.value.trim();
  const player2Name = secondPlayer.value.trim();

  if (!player1Name || !player2Name) {
    alert("Please enter names for both players!");
    return;
  }

  player1 = gamePlayers(player1Name, "X");
  player2 = gamePlayers(player2Name, "O");

  playerOne.textContent = player1Name;
  playerTwo.textContent = player2Name;
  currentPlayer = player1;

  scoreBoard.style.display = "flex";

  matchDetails.textContent = `${currentPlayer.player}'s turn!`;
  matchDetails.classList.add("turn-item");

  drawBoard();
});
