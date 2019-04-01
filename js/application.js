import { Spaceship } from "./spaceship.js";

let spaceship = new Spaceship();

function init() {
    setCanvasArea();
    makeInitialSpaceship();
    setSpaceshipEvents();

    setInterval(draw, 10);
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



function draw() {
    let canvas = document.getElementById('canvas-area');
    let context = canvas.getContext('2d');

    let spaceship = new Image();
    let shotBall = new Image();

    spaceship.src = '../images/spaceship.png';
    shotBall.src = '../images/ball.png';

    clearCanvas();

    spaceship.onload = () => context.drawImage(spaceship, lastXSpaceshipPosition, lastYSpaceshipPosition);

    shotBall.onload = () => ballShotList.forEach((value) => context.drawImage(shotBall, value.ballXPosition, value.ballYPosition -= 2));

    context.restore();
}



function setSpaceshipEvents() {
    window.addEventListener('keypress', keyPress, false);
}

function keyPress(event) {
    if (event.charCode == 119 || event.charCode == 87) {
        spaceshipMove(false, false, true, false, 10);
        console.log('top');
    } else if (event.charCode == 97 || event.charCode == 65) {
        spaceshipMove(true, false, false, false, 10);
        console.log('left');
    } else if (event.charCode == 100 || event.charCode == 68) {
        spaceshipMove(false, true, false, false, 10);
        console.log('right');
    } else if (event.charCode == 115 || event.charCode == 83) {
        spaceshipMove(false, false, false, true, 10);
        console.log('bottom');
    } else if (event.charCode == 32) {
        fire();
        console.log('fire');
    }
}