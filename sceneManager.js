import { drawBoard, setupBoard} from "./sketch.js";
import { drawTitle, setupTitle} from "./titleScreen.js";

let sceneDrawFn = (p) => {
    drawBoard(p);
} 

function sketch(p) {
    p.preload = () => {
        p.images = {
            bgImage: p.loadImage('/peter.png')
        };
        p.buttons = {
            toTitleButton: ""
        }
    }

    p.setup = () => { 
        p.createCanvas(800, 800);
        setupBoard(p);
        setupTitle(p);
    }

    p.draw = () => {
        sceneDrawFn(p);
    }
    let titleButton = document.getElementById("titleButton");
    titleButton.onclick = function(){
        sceneDrawFn = drawTitle;
        sceneSetupFn = setupTitle;
    };

    p.buttons.toTitleButton.onclick = function(){
        sceneDrawFn = drawBoard;
    };
    
}


new p5(sketch);