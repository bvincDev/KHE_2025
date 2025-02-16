let redTeam;
let startButton;
let yellowTeam;

function setup () {
    createCanvas(windowWidth, windowHeight);
    background(255, 204, 0);
    startButton = createButton('START GAME');
    startButton.position((windowWidth - startButton.width) / 2, (windowHeight - startButton.height) / 2);
    startButton.mousePressed(goToLink);
    startButton.style('font-size', '36px');
    startButton.style('border', 'none ');
    startButton.style ('background-color',' rgb(255, 204, 0)');
    startButton.style('cursor', 'pointer');
    startButton.style('font-weight', 'bold');

    redTeam = createSelect();
    redTeam.position((windowWidth - startButton.width) / 5, (windowHeight - startButton.height) / 1.5);
    redTeam.style('font-size', '24px');
    redTeam.style('border', 'none');
    redTeam.style('background-color', 'rgb(231, 209, 160)');
    redTeam.style('cursor', 'pointer');
    redTeam.style('font-weight', 'bold');
    redTeam.option('NONE');
    redTeam.option('DOCTOR');
    redTeam.option('GAMER');
    redTeam.option('IDOL');
    redTeam.option('SLEEPER');
    redTeam.option('PIRATE');
    redTeam.option('FRESHMAN');
    redTeam.option('PETER');
    

    yellowTeam
}

function draw () {
    background(255, 204, 0)
    

   
}
function goToLink () {
    window.location.href = 'game.html'
}

