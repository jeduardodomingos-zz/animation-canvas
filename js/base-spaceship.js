export class BaseSpaceship {
    constructor() {
        this.score = 0;
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

    drawSpaceship(layoutPath) {
        let canvas = document.getElementById('canvas-area');
        let context = canvas.getContext('2d');
        let spaceship = new Image();

        spaceship.src = layoutPath;

        context.drawImage(spaceship, this.lastXPosition == null ? this.initialXPosition : this.lastXPosition, this.lastYPosition == null ? this.initialYPosition : this.lastYPosition);
    }

    clearCanvas() {
        let canvas = document.getElementById(this.canvasAreaName);
        let context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
    }

    makeInitialSpaceship() {
        this.setInitialSpaceship();
        this.drawSpaceship(this.layoutPath);
    }

    setInitialSpaceship() {
        let canvas = document.getElementById(this.canvasAreaName);

        this.initialXPosition = (canvas.width / 2) - this.marginX;
        this.initialYPosition = (canvas.height) - this.marginY;
    }
}