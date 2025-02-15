//many variables are referred to as "shatter." the original plan was to make arc tangents that scattered when the circle met the shatter condition; I couldn't get it to work. p5 doesn't have find and replace, and the concept of a bubble bursting is close enough, so

let circleX = [];
let circleY = [];
let circleRadius = [];
let speedX = [];
let speedY = [];
//shatterChance will be used as a 1/whatever value
let shatterChance = 6;
let shatterTrue = [];
let shardArray = [];
let speedMin = 0.5;
let speedMax = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  strokeWeight(3);
  stroke("white");
  noFill();

  //populates circle coordinate options. has 2 options to ensure every index gets a coordinate pair regardless of w:h.
  if (width > height) {
    for (let i = 0; i <= width / 15; i++) {
      circleRadius[i] = random(20, 50);
      circleX[i] = random(circleRadius[i], width - circleRadius[i]);
      circleY[i] = random(circleRadius[i], height - circleRadius[i]);
      speedX[i] = random(speedMin, speedMax);
      speedY[i] = random(speedMin, speedMax);
      shatterTrue[i] = floor(random(shatterChance));
    }
  }
  
  if (width < height) {
    for (let i = 0; i <= height / 15; i++) {
      circleRadius[i] = random(20, 50);
      circleX[i] = random(width);
      circleY[i] = random(height);
      speedX[i] = random(speedMin, speedMax);
      speedY[i] = random(speedMin, speedMax);
      shatterTrue[i] = floor(random(shatterChance));
    }
  }
}

//behold the power of functions
function draw() {
  background("black");
  circleDraw();
}

let shatterFrame = [];
let splitDirX;
let splitDirY;

//function that draws circles
function circleDraw() {
  for (i = 0; i < circleX.length; i++) {
    //if the circle is out in the boondocks b/c it passed the shatter chance, see if it's been long enough to bring it back
    if (circleX[i] < -300 && circleY[i] < -300) {
      if (frameCount - shatterFrame[i] >= getTargetFrameRate()) {
        //bring it back
        circleReturn(i);
      }
    }
    //if circle's x goes too far, shunts it the opposite direction
    else if (
      circleX[i] + circleRadius[i] / 2 > width ||
      circleX[i] - circleRadius[i] / 2 < 0
    ) {
      speedX[i] *= -1;
      shatterEval(i);
    }
    //if circle's y goes too far, shunts it the opposite direction
    else if (
      circleY[i] + circleRadius[i] / 2 > height ||
      circleY[i] - circleRadius[i] / 2 < 0
    ) {
      speedY[i] *= -1;
      shatterEval(i);
    }
    
    //draws the circle
    circle(circleX[i], circleY[i], circleRadius[i]);

    //updates circle position to move
    circleX[i] += speedX[i];
    circleY[i] += speedY[i];
  }
}

//function that evaluates if the circle should vanish. there's a number it has to equal when it hits the wall; if it doesn't equal the number, it goes up a value and tries again.
function shatterEval(index) {
  if (shatterTrue[index] == shatterChance - 1) {
    shatterTrue[index] = 0;

    //kills the circle. shunts it off the canvas
    circleX[index] = -500;
    circleY[index] = -500;
    //gives a cooldown reference
    shatterFrame[index] = frameCount;
  }
  
  //if the circle fails the hide check, it bounces with some ~chromatic aberration.~ couldn't figure out how to get frame holds on it
  else {
    shatterTrue[index]++;
    //checks what direction to push the color copies so they stay in bounds
    if (circleX[index] < width / 2) {
      splitDirX = 1;
    } else {
      splitDirX = -1;
    }
    if (circleY[index] < height / 2) {
      splitDirY = 1;
    } else {
      splitDirY = -1;
    }
    //creates chromatic abberation copies. I can't explain why these blend modes & color channels work--I've had a CSP auto-action for this for ages and I'm going off of that
    for (j = 0; j < 5; j++) {
      blendMode(LIGHTEST);
      stroke(0, 0, 255);
      circle(
        circleX[index] + random(j) * splitDirX,
        circleY[index] + random(j) * splitDirX,
        circleRadius[index]
      );
      stroke(0, 255, 0);
      circle(
        circleX[index] + random(j) * splitDirX,
        circleY[index] + random(j) * splitDirX,
        circleRadius[index]
      );
      blendMode(BLEND);
      stroke(255, 0, 0);
      circle(circleX[index] + j, circleY[index] + j, circleRadius[index]);
      stroke("white");
    }
  }
}

//function that brings circle back to the center after the shatter cooldown
function circleReturn(index) {
  shatterFrame[index] = 0;
  circleX[index] = width / 2;
  circleY[index] = height / 2;
}
