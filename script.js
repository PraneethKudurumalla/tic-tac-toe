const cells = document.querySelectorAll('[data-cell]');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let gameActive = true;
let currentPlayer = 'X'; // Player is X, CPU is O

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handlePlayerMove));
restartBtn.addEventListener('click', restartGame);

function handlePlayerMove(e) {
  const cell = e.target;
  if (cell.textContent !== '' || !gameActive || currentPlayer !== 'X') return;

  makeMove(cell, 'X');

  if (checkWin('X')) {
    endGame('🎉 You win!');
    return;
  }

  if (isDraw()) {
    endGame("It's a draw!");
    return;
  }

  currentPlayer = 'O';
  setTimeout(cpuMove, 500); // Delay for realism
}

function cpuMove() {
  const emptyCells = [...cells].filter(cell => cell.textContent === '');
  if (!gameActive || emptyCells.length === 0) return;

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomCell, 'O');

  if (checkWin('O')) {
    endGame('💻 CPU wins!');
    return;
  }

  if (isDraw()) {
    endGame("It's a draw!");
    return;
  }

  currentPlayer = 'X';
}

function makeMove(cell, player) {
  cell.textContent = player;
  cell.classList.add(player);
}

function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => cells[index].textContent === player)
  );
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function endGame(resultText) {
  gameActive = false;
  message.textContent = resultText;
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
  gameActive = true;
  currentPlayer = 'X';
  message.textContent = '';
}
