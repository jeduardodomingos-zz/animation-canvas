import { Spaceship } from "./spaceship.js";

let spaceship = new Spaceship();

window.onload = () => {
    initializeSpaceship();
    init();
};

function initializeSpaceship() {
    spaceship.marginX = 70;
    spaceship.marginY = 140;
    spaceship.colisionY = 130;
    spaceship.colisionX = 130;
    spaceship.canvasAreaName = "canvas-area";
    spaceship.layoutPath = "../images/spaceship.png";
}

function init() {
    setSpaceshipEvents();
    setCanvasArea();
    clearCanvas();

    spaceship.setInitialSpaceship();
    spaceship.makeInitialSpaceship();
    spaceship.spaceshipMove(false, false, true, false, 10);

    document.getElementById('record-value').innerHTML = localStorage.getItem("space-record");

    setInterval(drawAll, 10);
}

function drawAll() {
    spaceship.makeEnemy();
    spaceship.drawEnemies();
    spaceship.drawSpaceship();
    spaceship.drawFire();
}

function setCanvasArea() {
    let canvas = document.getElementById('canvas-area');
    let container = document.getElementById('canvas-container');

    canvas.setAttribute('height', container.clientHeight);
    canvas.setAttribute('width', container.clientWidth);
}

function clearCanvas() {
    let canvas = document.getElementById('canvas-area');
    let context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
}

function spaceshipKeyPress(event) {
    if (event.charCode == 119 || event.charCode == 87) {
        spaceship.spaceshipMove(false, false, true, false, 10);
        console.log('top');
    } else if (event.charCode == 97 || event.charCode == 65) {
        spaceship.spaceshipMove(true, false, false, false, 10);
        console.log('left');
    } else if (event.charCode == 100 || event.charCode == 68) {
        spaceship.spaceshipMove(false, true, false, false, 10);
        console.log('right');
    } else if (event.charCode == 115 || event.charCode == 83) {
        spaceship.spaceshipMove(false, false, false, true, 10);
        console.log('bottom');
    } else if (event.charCode == 32) {
        spaceship.makeFire();
        console.log('fire');
    }
}

function setSpaceshipEvents() {
    window.addEventListener('keypress', spaceshipKeyPress, false);
}

