import { Shot } from "./shot.js";

export class Spaceship {

    constructor() {
        this.initialXPosition = null;
        this.initialYPosition = null;
        this.lastYPosition = null;
        this.lastXPosition = null;
        this.marginX = null;
        this.marginY = null;
        this.colisionX = null;
        this.colisionY = null;
        this.movePxLength = null;
        this.shots = null;
        this.layoutPath = null;
        this.canvasAreaName = null;
        this.shots = [];
    }

    clearCanvas() {
        let canvas = document.getElementById(this.canvasAreaName);
        let context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
    }

    makeInitialSpaceship() {
        this.setInitialSpaceship();
        this.drawSpaceship(this.layoutPath, this.initialXPosition, this.initialYPosition);
    }

    setInitialSpaceship() {
        let canvas = document.getElementById(this.canvasAreaName);

        this.initialXPosition = (canvas.width / 2) - this.marginX;
        this.initialYPosition = (canvas.height) - this.marginY;
    }

    makeFire() {
        let fireCount = this.shots.length;

        let newShot = new Shot();

        newShot.shotNumber = fireCount + 1;
        newShot.marginX = 56;
        newShot.marginY = 15;
        newShot.shotXPositon = this.lastXPosition + newShot.marginX;
        newShot.shotYPosition = this.lastYPosition + newShot.marginY;

        this.shots.push(newShot);
    }

    spaceshipMove(left, right, top, bottom, increment) {
        let canvas = document.getElementById(this.canvasAreaName);

        console.log(this.canvasAreaName);

        this.lastXPosition = this.lastXPosition == null ? this.initialXPosition : this.lastXPosition;
        this.lastYPosition = this.lastYPosition == null ? this.initialYPosition : this.lastYPosition;

        this.clearCanvas();

        if (left && this.lastXPosition >= 0) {
            this.lastXPosition -= increment;
        } else if (right && this.lastXPosition < canvas.width - this.colisionX) {
            this.lastXPosition += increment;
        } else if (bottom && this.lastYPosition < canvas.height - this.colisionY) {
            this.lastYPosition += increment;
        } else if (top && this.lastYPosition > canvas.height / 2) {
            this.lastYPosition -= increment;
        }

        this.drawSpaceship(this.layoutPath, this.lastXPosition, this.lastYPosition);
    }

    drawSpaceship(layoutPath) {
        let canvas = document.getElementById('canvas-area');
        let context = canvas.getContext('2d');
        let spaceship = new Image();

        spaceship.src = layoutPath;

        spaceship.onload = () => {
            context.drawImage(spaceship, this.lastXPosition, this.lastYPosition);
        };
    }
}