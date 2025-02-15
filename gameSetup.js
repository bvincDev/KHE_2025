function setup() {
    createCanvas(400, 420);
  }
  
  function draw() {
      
    noStroke();
    
    blockHeight = height/7;
    
    fill("red");
    rect(0, blockHeight*0, width, blockHeight);
    
    fill("orange");
    rect(0, blockHeight*1, width, blockHeight);
    
    fill("yellow");
    rect(0, blockHeight*2, width, blockHeight);
    
    fill("green");
    rect(0, blockHeight*3, width, blockHeight);
    
    fill("blue");
    rect(0, blockHeight*4, width, blockHeight);
    
    fill("indigo");
    rect(0, blockHeight*5, width, blockHeight);
    
    fill("purple");
    rect(0, blockHeight*6, width, blockHeight);
    
  }