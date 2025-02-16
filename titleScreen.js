let board;
const rows = 6;
const cols = 7;
let cellSize;
let currentPlayer = 'red'; // set the starting player
export let bgImage;


export function setupTitle(p) {
    console.log("help!")
    p.buttons.toTitleButton = p.createButton();
    console.log(p.buttons.toTitleButton);
    p.buttons.toTitleButton.position(0, 100);
    p.buttons.toTitleButton.mousePressed(console.log("green"));
    p.buttons.toTitleButton.value("New game!");
    p.buttons.toTitleButton.id("toNewGame");
    p.buttons.toTitleButton.hide();
}


export function drawTitle(p) {
    //p.image(p.images.bgImage, 0, 0);
    p.buttons.toTitleButton.show();
}
