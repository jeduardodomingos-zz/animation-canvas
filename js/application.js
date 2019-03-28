let defaultMarginWidth = 70;
let defaultMarginHeight = 140;

let lastXSpaceshipPosition = null;
let lastYSpaceshipPosition = null;

function init() {
    setCanvasArea();
    makeInitialSpaceship();
    setSpaceshipEvents();
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

function spaceshipMove(left, right, top, bottom, increment) {
    let canvas = document.getElementById('canvas-area');
    let context = canvas.getContext('2d');
    let img = new Image();

    img.src = '../images/spaceship.png';

    let defaultValues = initialSpaceshipValues();

    lastXSpaceshipPosition = lastXSpaceshipPosition == null ? defaultValues.initialX : lastXSpaceshipPosition;
    lastYSpaceshipPosition = lastYSpaceshipPosition == null ? defaultValues.initialY : lastYSpaceshipPosition;

    clearCanvas();

    if (left) {
        lastXSpaceshipPosition -= increment;
    } else if (right) {
        lastXSpaceshipPosition += increment;
    } else if (bottom) {
        lastYSpaceshipPosition += increment;
    } else if (top) {
        lastYSpaceshipPosition -= increment;
    }

    img.onload = () => {
        context.drawImage(img, lastXSpaceshipPosition, lastYSpaceshipPosition);
    }

    context.restore();
}

function initialSpaceshipValues() {
    let canvas = document.getElementById('canvas-area');

    let initialXSpaceship = (canvas.width / 2) - defaultMarginWidth;
    let initialYSpaceship = (canvas.height) - defaultMarginHeight;

    return { initialX: initialXSpaceship, initialY: initialYSpaceship };
}

function makeInitialSpaceship() {
    let canvas = document.getElementById('canvas-area');
    let context = canvas.getContext('2d');

    let img = new Image();

    img.src = '../images/spaceship.png';

    let defaultValues = initialSpaceshipValues();

    img.onload = () => {
        context.drawImage(img, defaultValues.initialX, defaultValues.initialY);
    }
}

function setSpaceshipEvents() {
    window.addEventListener('keypress', keyPress, false);
}

function keyPress(event) {
    if (event.charCode == 119 || event.charCode == 87) {
        spaceshipMove(false, false, true, false, 5);
        console.log('top');
    } else if (event.charCode == 97 || event.charCode == 65) {
        spaceshipMove(true, false, false, false, 5);
        console.log('left');
    } else if (event.charCode == 100 || event.charCode == 68) {
        spaceshipMove(false, true, false, false, 5);
        console.log('right');
    } else if (event.charCode == 115 || event.charCode == 83) {
        spaceshipMove(false, false, false, true, 5);
        console.log('bottom');
    }
}