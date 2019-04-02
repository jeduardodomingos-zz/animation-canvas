import { Shot } from "./shot.js";

export class Spaceship {

    constructor(initialXPosition, initialYPosition, lastYPosition, lastXPosition, marginX, marginY, colisionX, colisionY, movePxLength, shots, layoutPath, canvasAreaName) {
        this.shots = [];
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
        let fireCount = shots.length;

        let newShot = new Shot();

        newShot.shotNumber = fireCount + 1;
        newShot.marginX = 56;
        newShot.marginY = 15;
        newShot.shotXPositon = this.lastXPosition;
        newShot.shotYPosition = this.lastYPosition;

        this.shots(newShot);
    }

    spaceshipMove(left, right, top, bottom, increment) {
        let canvas = document.getElementById(canvasAreaName);

        this.lastXPosition = this.lastXPosition == null ? this.initialXPosition : this.lastXPosition;
        this.lastYPosition = this.lastYPosition == null ? this.initialYPosition : this.lastYPosition;

        clearCanvas();

        if (left && this.lastXPosition > 0) {
            this.lastXPosition -= increment;
        } else if (right && this.lastXPosition < canvas.width - this.colisionX) {
            this.lastXPosition += increment;
        } else if (bottom && this.lastYPosition < canvas.height - this.colisionY) {
            this.lastYPosition += increment;
        } else if (top && this.lastYPosition > canvas.height / 2) {
            this.lastYPosition -= increment;
        }

        drawSpaceship(this.layoutPath, this.lastXPosition, this.lastYPosition);
    }

    drawSpaceship(layoutPath, x, y) {
        let canvas = document.getElementById(this.canvasAreaName);
        let context = canvas.getContext('2d');
        let spaceship = new Image();

        spaceship.src = layoutPath;

        spaceship.onload = () => {
            context.drawImage(spaceship, x, y);
        };
    }

}