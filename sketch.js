let board; // stores the board state in array
redScore = 0;
yellowScore = 0;
const boardSize = 800; // fixed board size
const rows = 6;
const cols = 7;
let cellSize;
let currentPlayer = 'red'; // set the starting player
let redImg, yellowImg;
let popSound;

function preload() { 
  cellSize = boardSize / cols; // keep board cells at board size
  redImg = loadImage('assets/red_chip.png', img => {
    img.resize(cellSize, cellSize);
  }); 
  yellowImg = loadImage('assets/yellow_chip.png', img => {
    img.resize(cellSize, cellSize);
  });
  popSound = loadSound(assets/pop.wav);
}


function setup() {
  // Create a full-screen canvas
  createCanvas(windowWidth, boardSize);
  
  // Center the board on the canvas
  xOffset = (width - boardSize) / 2;
  yOffset = (height - boardSize) / 2;
  
  // Use the fixed boardSize for cellSize
  cellSize = boardSize / cols;
  
  // Initialize the board
  board = Array.from({ length: rows }, () => Array(cols).fill(' '));
}


function draw() {
  background(255);
  drawBoard();
}

function drawBoard() {
  push();
  // Translate so that the board is drawn at the desired offset
  translate(xOffset, yOffset);
  noStroke();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      fill(20, 0, 200); // Blue board background
      rect(c * cellSize, r * cellSize, cellSize, cellSize);
      fill(255); // color fill inside spaces
      stroke(0); // black border
      strokeWeight(8); // border thickness

      ellipse(
        c * cellSize + cellSize / 2,
        r * cellSize + cellSize / 2,
        cellSize * 0.65 // size of the circle
      );

      noStroke(); // disable stroke for images

      if (board[r][c] === 'red') {
        image(redImg, c * cellSize, r * cellSize, cellSize, cellSize);
      } else if (board[r][c] === 'yellow') {
        image(yellowImg, c * cellSize, r * cellSize, cellSize, cellSize);
      }

    }
  }
  pop();
}

function mousePressed() {
  // check if where you click is inside the board area with the offset
  if (mouseX < xOffset || mouseX > xOffset + boardSize || mouseY < yOffset || mouseY > yOffset + boardSize) {
    return;
  }
  
  // Adjust the mouseX coordinate to the new board position
  let adjustedX = mouseX - xOffset;
  let col = Math.floor(adjustedX  / cellSize); // get the column by checking mouses x position
  if (col >= 0 && col < cols) {
    for (let row = rows - 1; row >= 0; row--) {
      if (board[row][col] === ' ') {
        board[row][col] = currentPlayer;
        if (fourInARow(row, col)) {
          console.log(currentPlayer + ' got a combo!');
          if(currentPlayer === 'red') {
            redScore++;
          }
          if(currentPlayer === 'yellow') {
            yellowScore++;
          }
        }
        pieceDrop();
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        popSound.play();
        break;
      }
    }
  }
}

function pieceDrop() { // applies gravity to the pieces checking if there is anything underneath
  for (let col = 0; col < cols; col++) {
    for (let row = rows - 1; row > 0; row--) {
      if (board[row][col] === ' ' && board[row - 1][col] !== ' ') { 
        board[row][col] = board[row - 1][col]; // move the piece down
        board[row - 1][col] = ' '; // remove the piece from the previous position
      }
      
    }
  }
}

function fourInARow(row, col) { 
  return (
    checkHorizontal(row) || // horizontal
    checkVertical(col) || // vertical
    checkDiagonal1(row, col) || // diagonal \
    checkDiagonal2(row, col) // diagonal /
  );
}

function checkHorizontal(row) {
  let count = 0;
  for (let c = 0; c < cols; c++) {
    count = (board[row][c] === currentPlayer) ? count + 1 : 0; 
    if (count === 4) {
      //delete piece
      for (let i = 0; i < 4; i++) { 
        board[row][c - i] = ' ';
      }
      return true;
    }
  }
  return false;
}

function checkVertical(col) {
  let count = 0;
  for (let r = 0; r < rows; r++) {
    count = (board[r][col] === currentPlayer) ? count + 1 : 0;
    if (count === 4) {
      //delete pieces
      for (let i = 0; i < 4; i++) {
        board[r - i][col] = ' ';
      }
      return true;
    }
  }
  return false;
}

function checkDiagonal1(row, col) {
  let count = 0;
  for (let i = -3; i <= 3; i++) {
    let r = row + i;
    let c = col + i;
    if (r >= 0 && r < rows && c >= 0 && c < cols) {
      count = (board[r][c] === currentPlayer) ? count + 1 : 0;
      if (count === 4){
        //delete pieces
        for (let j = 0; j < 4; j++) {
          board[row + j][col + j] = ' ';
        }
        return true;
      }
    }
  }
  return false;
}

function checkDiagonal2(row, col) {
  let count = 0;
  for (let i = -3; i <= 3; i++) {
    let r = row + i;
    let c = col - i;
    if (r >= 0 && r < rows && c >= 0 && c < cols) {
      count = (board[r][c] === currentPlayer) ? count + 1 : 0;
      if (count === 4) {
        //delete pieces
        for (let j = 0; j < 4; j++) {
          board[row + j][col - j] = ' ';
        }
        return true;
      }
    }
  }
  return false;
}

function windowResized() {
  // if the window is resized, the board will be centered
  resizeCanvas(windowWidth, windowHeight);
  xOffset = (width - boardSize) / 2;
  yOffset = (height - boardSize) / 2;

}