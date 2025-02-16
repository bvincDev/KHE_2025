let board;
const rows = 6;
const cols = 7;
let cellSize;
let currentPlayer = 'red'; // set the starting player


export function setupBoard(p) {
  cellSize = p.width / cols;
  board = Array.from({ length: rows }, () => Array(cols).fill(' '));
}




export function drawBoard(p) {
  p.noStroke();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      p.fill(20, 0, 200); // Blue board background
      p.rect(c * cellSize, r * cellSize, cellSize, cellSize);
      
      p.fill(255);// inside spaces
      
      p.ellipse(
        c * cellSize + cellSize / 2,
        r * cellSize + cellSize / 2,
        cellSize * 0.8
      );
    }
  }
}


