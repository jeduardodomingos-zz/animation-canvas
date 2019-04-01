export class Shot {
    constructor(shotNumber, shotXPositon, shotYPosition, marginX, marginY) {
        this.shotNumber = null;
        this.shotXPositon = null;
        this.shotYPosition = null;
        this.marginX = null;
        this.marginY = null;
    }

    set shotXPositon(value) {
        this.shotXPositon = value + this.marginX;
    }
    set shotYPosition(value) {
        this.shotYPosition = value + this.marginY;
    }
}