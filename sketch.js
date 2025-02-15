let board;
const rows = 6;
const cols = 7;
let cellSize;
let currentPlayer = 'red'; // set the starting player

function setup() {
  createCanvas(800, 800);
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
    }
  }
}


