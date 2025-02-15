let board;
const rows = 6;
const cols = 7;
let cellSize;
let currentPlayer = 'red'; // set the starting player
let redImg, yellowImg;

function preload() { 
  redImg = loadImage('assets/red_chip.png'); 
  yellowImg = loadImage('assets/yellow_chip.png');
}

function setup() {
  createCanvas(800, 800);
  cellSize = width / cols;
  board = Array.from({ length: rows }, () => Array(cols).fill(' '));
  
}

function draw() {
  
  background(255);
  drawBoard();
}

function drawBoard() {
  noStroke();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      fill(20, 0, 200); // Blue board background
      rect(c * cellSize, r * cellSize, cellSize, cellSize);
      
      fill(255);// inside spaces

      ellipse(
        c * cellSize + cellSize / 2,
        r * cellSize + cellSize / 2,
        cellSize * 0.8
      );
      
      if (board[r][c] === 'red') {
        image(redImg, c * cellSize, r * cellSize, cellSize, cellSize);
      } else if (board[r][c] === 'yellow') {
        image(yellowImg, c * cellSize, r * cellSize, cellSize, cellSize);
      }
    }
  }
}

function mousePressed() {
  let col = Math.floor(mouseX / cellSize);
  if (col >= 0 && col < cols) {
    for (let row = rows - 1; row >= 0; row--) {
      if (board[row][col] === ' ') {
        board[row][col] = currentPlayer;
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        break;
      }
    }
  }
}
