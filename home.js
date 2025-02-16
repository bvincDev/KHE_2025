let redTeam;
let startButton;
let yellowTeam;
let redChip;
let yellowChip;
let skins;

function preload () {
redChip = loadImage('assets/red_chip.png');
yellowChip = loadImage('assets/yellow_chip.png');

skins = [ 
    {value: 'NONE', image: null},
    {value: 'DOCTOR', image: loadImage('assets/dococt_skin.png')},
]


}

function setup () {
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
    redTeam.option('DOCTOR' , skins.value);
    redTeam.option('GAMER');
    redTeam.option('IDOL');
    redTeam.option('SLEEPER');
    redTeam.option('PIRATE');
    redTeam.option('FRESHMAN');
    redTeam.option('PETER');
    

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

    
    
}


function draw () {
    background(255, 204, 0);

    let redChipX = ((windowWidth - 600) / 7.5);
    image(redChip, redChipX,((windowHeight - 30) / 4), 600, 600); //helps create x position for red chip so yellow chip can reflect of its position
    image(yellowChip, (windowWidth - redChipX - 500) , (windowHeight - 30) / 4, 600, 600);

    image(skins, redChipX, (windowHeight - 30) / 4, 600, 600);
    
   
}

function goToLink () {
    window.location.href = 'game.html';
}

