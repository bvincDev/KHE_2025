let redTeam;
let startButton;
let yellowTeam;
let redChip;
let yellowChip;
let sickBeat;
let chipImages = {};
let selectedRedChip = 'NONE';
let selectedYellowChip = 'NONE';

function preload () {
sickBeat = loadSound('assets/connect.mp3');
redChip = loadImage('assets/red_chip.png');
yellowChip = loadImage('assets/yellow_chip.png');

chipImages['DOCTOR'] = loadImage('assets/dococt_skin.png');
chipImages['GAMER'] = loadImage('assets/fortnite_skin.png');
chipImages['IDOL'] = loadImage('assets/hatsunemiku_skin.png');
chipImages['SLEEPER'] = loadImage('assets/nappin_skin.png');
chipImages['PIRATE'] = loadImage('assets/piratecap_skin.png');
chipImages['FRESHMAN'] = loadImage('assets/wave_skin.png');
chipImages['PETER'] = loadImage('assets/petergriffin_skin.png');
chipImages['NONE'] = loadImage('assets/default_chip.png');


}

function setup () {
    sickBeat.loop();
    createCanvas(windowWidth, windowHeight);
    background(255, 204, 0);


    startButton = createButton('START GAME');
    startButton.position((windowWidth - 200) / 2, (windowHeight - 50) / 2);
    startButton.mousePressed(goToLink);
    startButton.style('font-size', '48px');
    startButton.style('border', 'none ');
    startButton.style ('background-color',' rgb(255, 204, 0)');
    startButton.style('cursor', 'pointer');
    startButton.style('font-weight', 'bold');

    redTeam = createSelect();
    redTeam.position((windowWidth - 200) / 5, (windowHeight - 30) / 1.5);
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
    redTeam.changed(() => {
        selectedRedChip = redTeam.value();
    });

  

    yellowTeam = createSelect()
    yellowTeam.position((windowWidth - 200 /5 - 500)  , (windowHeight - 30) / 1.5);
    yellowTeam.style('font-size', '24px');
    yellowTeam.style('border', 'none');
    yellowTeam.style('background-color', 'rgb(231, 209, 160)');
    yellowTeam.style('cursor', 'pointer');
    yellowTeam.style('font-weight', 'bold');

    yellowTeam.option('NONE');
    yellowTeam.option('DOCTOR');
    yellowTeam.option('GAMER');
    yellowTeam.option('IDOL');
    yellowTeam.option('SLEEPER');
    yellowTeam.option('PIRATE');
    yellowTeam.option('FRESHMAN');
    yellowTeam.option('PETER');
    yellowTeam.changed(() => {
        selectedYellowChip = yellowTeam.value();
    });
    
   
    
    
}


function draw () {
    background(255, 204, 0);

    let redChipX = ((windowWidth - 600) / 7.5);
    image(redChip, redChipX,((windowHeight - 30) / 4), 600, 600); //helps create x position for red chip so yellow chip can reflect of its position
    image(yellowChip, (windowWidth - redChipX - 500) , (windowHeight - 30) / 4, 600, 600);

    image(chipImages[selectedRedChip], redChipX, ((windowHeight - 30) / 4), 600, 600);
    image(chipImages[selectedYellowChip], (windowWidth - redChipX - 500),  (windowHeight - 30) / 4, 600, 600);
   
}




function goToLink () {
    window.location.href = 'game.html';
}

