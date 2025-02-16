let board; // stores the board state in array
redScore = 0;
yellowScore = 0;
const boardSize = 800; // fixed board size
const rows = 6;
const cols = 7;
let cellSize;
let currentPlayer = 'red'; // set the starting player
let docImg, fortniteImg, hatsunImg, nappinImg, peterImg, pirateImg, waveImg, redImg, yellowImg; // epic pieces
let curRedImg, curYellowImg;


let popSound;
let sickBeat;



function preload() { 
  cellSize = boardSize / cols; // keep board cells at board size
  redImg = loadImage('assets/red_chip.png', img => {
    img.resize(cellSize, cellSize);
  }); 
  
  yellowImg = loadImage('assets/yellow_chip.png', img => {
    img.resize(cellSize, cellSize);
  });
  popSound = loadSound('assets/pop.wav');
  sickBeat = loadSound('assets/connect.mp3');
}


function setup() {
  sickBeat.loop();

  // Create a full-screen canvas
  createCanvas(windowWidth, boardSize);
  
  // Center the board on the canvas
  xOffset = (width - boardSize) / 2;
  yOffset = (height - boardSize) / 2;
  
  // Use the fixed boardSize for cellSize
  cellSize = boardSize / cols;
  
  // initialize the board
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
  highlightColumn();
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

function mousePressed() { // updatge the board when the mouse is clicked
  // check if where you click is inside the board area with the offset
  if (mouseX < xOffset || mouseX > xOffset + boardSize || mouseY < yOffset || mouseY > yOffset + boardSize) {
    return;
  }
  
  // Adjust the mouseX coordinate to the new board position
  let adjustedX = mouseX - xOffset;
  let col = Math.floor(adjustedX  / cellSize); // get the column by checking mouses x position
  if (col >= 0 && col < cols) {
    for (let row = rows - 1; row >= 0; row--) {
      if (board[row][col] === ' ') { // check if the cell is empty
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
        // Check for cascading combos after pieces have fallen
        cascade();

        if (isBoardFull()) { //check for end game
          endGame();
          return;
        }
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

function highlightColumn() {
  // Check if the mouse is within the board area
  if (mouseX >= xOffset && mouseX <= xOffset + boardSize && mouseY >= yOffset && mouseY <= yOffset + boardSize) {
    let col = Math.floor((mouseX - xOffset) / cellSize);
    if(currentPlayer === 'red') {
      fill(200, 0, 0, 200); // Dark blue with some transparency
      rect(col * cellSize, 0, cellSize, 720);
    }
    else{
      fill(250, 200, 0, 200); // Yellow with some transparency
      rect(col * cellSize, 0, cellSize, 720);
    }
    
  }
}

function cascade() {
  let comboFound;
  do {
    comboFound = false;
    
    // check horizontal combos
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c <= cols - 4; c++) {
        let color = board[r][c];
        if (color !== ' ' &&
            board[r][c+1] === color &&
            board[r][c+2] === color &&
            board[r][c+3] === color) {
          // remove the 4 in a row pieces
          for (let i = 0; i < 4; i++) {
            board[r][c+i] = ' ';
          }
          // update score for the corresponding color
          if (color === 'red') redScore++;
          else if (color === 'yellow') yellowScore++;
          comboFound = true;
        }
      }
    }
    
    // check vertical combos
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r <= rows - 4; r++) {
        let color = board[r][c];
        if (color !== ' ' &&
            board[r+1][c] === color &&
            board[r+2][c] === color &&
            board[r+3][c] === color) {
          for (let i = 0; i < 4; i++) {
            board[r+i][c] = ' ';
          }
          if (color === 'red') redScore++;
          else if (color === 'yellow') yellowScore++;
          comboFound = true;
        }
      }
    }
    
    // check diagonal (\) combos
    for (let r = 0; r <= rows - 4; r++) {
      for (let c = 0; c <= cols - 4; c++) {
        let color = board[r][c];
        if (color !== ' ' &&
            board[r+1][c+1] === color &&
            board[r+2][c+2] === color &&
            board[r+3][c+3] === color) {
          for (let i = 0; i < 4; i++) {
            board[r+i][c+i] = ' ';
          }
          if (color === 'red') redScore++;
          else if (color === 'yellow') yellowScore++;
          comboFound = true;
        }
      }
    }
    
    // check diagonal (/) combos
    for (let r = 0; r <= rows - 4; r++) {
      for (let c = 3; c < cols; c++) {
        let color = board[r][c];
        if (color !== ' ' &&
            board[r+1][c-1] === color &&
            board[r+2][c-2] === color &&
            board[r+3][c-3] === color) {
          for (let i = 0; i < 4; i++) {
            board[r+i][c-i] = ' ';
          }
          if (color === 'red') redScore++;
          else if (color === 'yellow') yellowScore++;
          comboFound = true;
        }
      }
    }
    
    // if any combo was found, drop the pieces again
    if (comboFound) {
      pieceDrop();
    }
    
  } while (comboFound);
}

// check if the board is completely filled
function isBoardFull() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === ' ') {
        return false;
      }
    }
  }
  return true;
}

// End the game 
function endGame() {
  noLoop(); 
  console.log("Game over! The board is full!");
  console.log("Red score: " + redScore);
  console.log("Yellow score: " + yellowScore);
}


