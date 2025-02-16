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

// Score elements
let redScoreDiv;
let yellowScoreDiv;

// Timer variables
let timerDiv;     // DOM element to display the timer
let timerStart;   // time when current turn started (in milliseconds)
const timeLimit = 5000;  // 5,000 millaseconds

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

  // Load all possible skins
  chipImages = {
    'DOCTOR': loadImage('assets/dococt_skin.png'),
    'GAMER': loadImage('assets/fortnite_skin.png'),
    'IDOL': loadImage('assets/hatsunemiku_skin.png'),
    'SLEEPER': loadImage('assets/nappin_skin.png'),
    'PIRATE': loadImage('assets/piratecap_skin.png'),
    'FRESHMAN': loadImage('assets/wave_skin.png'),
    'PETER': loadImage('assets/petergriffin_skin.png')
};

// Retrieve selected skins from localStorage
let redSkin = localStorage.getItem('redSkin');
let yellowSkin = localStorage.getItem('yellowSkin');

// Apply selected skins (fallback to default chip if not selected)
curRedImg = chipImages[redSkin] || redImg;
curYellowImg = chipImages[yellowSkin] || yellowImg;
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

  // Create a timer div and style it so it's centered at the top of the page (outside the canvas)
  timerDiv = createDiv('');
  timerDiv.style('position', 'fixed');
  timerDiv.style('top', '10px');
  timerDiv.style('left', '50%');
  timerDiv.style('transform', 'translateX(-50%)');
  timerDiv.style('font-size', '28px');
  timerDiv.style('font-family', 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif');
  timerDiv.style('color', '#ff0000');
  timerDiv.style('width', '200px'); // Set the width of the timerDiv
  timerDiv.style('text-align', 'center'); // Center the text inside the div
  timerDiv.style('text-shadow', '0 0 9px rgba(255, 72, 0, 0.5)'); // Add drop shadow
  

  // Get references to the score div elements
  redScoreDiv = select('#red-score');
  yellowScoreDiv = select('#yellow-score');


  // Start the turn timer
  timerStart = millis();
}

function updateTimer() {
  let elapsed = millis() - timerStart;
  
  // If the time limit is reached without a move, switch turn automatically.
  if (elapsed >= timeLimit) {
    currentPlayer = (currentPlayer === 'red') ? 'yellow' : 'red';
    timerStart = millis(); // reset the timer
  }
  
  // Calculate remaining time (in seconds)
  let timeLeft = Math.ceil((timeLimit - (millis() - timerStart)) / 1000);
  if (timeLeft < 0) timeLeft = 0;
  
  timerDiv.html("Current turn: " + currentPlayer + " - Time left: " + timeLeft + " seconds");
}

function updateScoreDisplay() {
  redScoreDiv.html(redScore);
  yellowScoreDiv.html(yellowScore);
}

function draw() {
  background(255);

  // Update timer and switch turn if time is up
  updateTimer();

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
      // Draw the board cell
      fill(20, 0, 200); // Blue board background
      rect(c * cellSize, r * cellSize, cellSize, cellSize);
      fill(255); // fill color for the circle background
      stroke(0); // black border for the circle
      strokeWeight(8); // border thickness

      // Draw the circle where the piece will go
      ellipse(
        c * cellSize + cellSize / 2,
        r * cellSize + cellSize / 2,
        cellSize * 0.65
      );

      noStroke(); // disable stroke for the images

      if (board[r][c] === 'red') {
        // draw the default red chip
        image(redImg, c * cellSize, r * cellSize, cellSize, cellSize);
        // overlay the selected red skin if one exists and it's not the default
        if (curRedImg && curRedImg !== redImg) {
          image(curRedImg, c * cellSize, r * cellSize, cellSize, cellSize);
        }
      } else if (board[r][c] === 'yellow') {
        // draw the default yellow chip
        image(yellowImg, c * cellSize, r * cellSize, cellSize, cellSize);
        // then overlay the selected yellow skin if one exists and it's not the default
        if (curYellowImg && curYellowImg !== yellowImg) {
          image(curYellowImg, c * cellSize, r * cellSize, cellSize, cellSize);
        }
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
  
  // adjust the mouseX coordinate to the new board position
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
          updateScoreDisplay();
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
    count = (board[r][col] === currentPlayer) ? count + 1 : 0; // check if the piece is the same as the current player
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

function showGameOverScreen() {
  // Create a div for the game over screen
  let gameOverDiv = createDiv('');
  gameOverDiv.style('position', 'fixed');
  gameOverDiv.style('top', '50%');
  gameOverDiv.style('left', '50%');
  gameOverDiv.style('transform', 'translate(-50%, -50%)');
  gameOverDiv.style('font-size', '32px');
  gameOverDiv.style('font-family', 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif');
  gameOverDiv.style('color', '#ffffff');
  gameOverDiv.style('background-color', 'rgba(0, 0, 0, 0.8)');
  gameOverDiv.style('padding', '20px');
  gameOverDiv.style('border-radius', '10px');
  gameOverDiv.style('text-align', 'center');
  gameOverDiv.style('box-shadow', '0 0 10px rgba(0, 0, 0, 0.5)');

  // Determine the winner
  let winner = redScore > yellowScore ? 'Red' : 'Yellow';
  if (redScore === yellowScore) {
    winner = 'No one, it\'s a tie';
  }

  // Set the content of the game over screen
  gameOverDiv.html(`
    <h1>Game Over!</h1>
    <p>Winner: ${winner}</p>
    <p>Red Score: ${redScore}</p>
    <p>Yellow Score: ${yellowScore}</p>
    <button id="restartButton">Restart</button>
  `);

  // event listener to the restart button
  select('#restartButton').mousePressed(() => {
    gameOverDiv.remove();
    resetGame();
  });
}

function endGame() {
  noLoop();
  console.log("Game over! The board is full!");
  console.log("Red score: " + redScore);
  console.log("Yellow score: " + yellowScore);
  showGameOverScreen();
}

function resetGame() {
  // Reset the board and scores
  board = Array.from({ length: rows }, () => Array(cols).fill(' '));
  redScore = 0;
  yellowScore = 0;
  currentPlayer = 'red';
  loop();
  timerStart = millis();
}