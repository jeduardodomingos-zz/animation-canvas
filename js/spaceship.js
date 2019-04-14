import { Shot } from "./shot.js";
import { BaseSpaceship } from "./base-spaceship.js";
import { EnemySpaceship } from "./enemy-spaceship.js";

export class Spaceship extends BaseSpaceship {

    constructor() {
        super();
        this.enemies = [];
    }

    makeEnemy() {
        let canvas = document.getElementById('canvas-area');
        let enemy = new EnemySpaceship();
        let lastEnemy;

        enemy.marginX = 40;
        enemy.marginY = 50;
        enemy.colisionX = 130;
        enemy.colisionY = 130;
        enemy.canvasAreaName = "canvas-area";
        enemy.layoutPath = '../images/enemy-spaceship.png';

        if (this.enemies.length > 0) {

            lastEnemy = this.enemies[this.enemies.length - 1];

            if (((lastEnemy.lastXPosition == null ? lastEnemy.initialXPosition : lastEnemy.lastXPosition)) < (canvas.width - lastEnemy.colisionX)) {
                enemy.initialXPosition = (lastEnemy.lastXPosition == null ? lastEnemy.initialXPosition : lastEnemy.lastXPosition) + enemy.marginX;
                enemy.initialYPosition = (lastEnemy.lastYPosition == null ? lastEnemy.initialYPosition : lastEnemy.lastYPosition);
            } else {
                enemy.initialXPosition = 0 + enemy.marginX;
                enemy.initialYPosition = (lastEnemy.lastYPosition == null ? lastEnemy.initialYPosition : lastEnemy.lastYPosition) + enemy.marginY;
            }
        } else {
            enemy.initialXPosition = 0 + enemy.marginX;
            enemy.initialYPosition = 0 + enemy.marginY;
        }

        if ((enemy.lastYPosition == null ? enemy.initialYPosition : enemy.lastYPosition) + enemy.marginY < canvas.height - enemy.colisionY * 3) {

            let fireCount = this.shots.length;

            let newShot = new Shot();

            newShot.shotNumber = fireCount + 1;
            newShot.marginX = enemy.marginX;
            newShot.marginY = enemy.marginY + 20;
            newShot.shotXPositon = (enemy.lastXPosition == null ? enemy.initialXPosition : enemy.lastXPosition) + newShot.marginX;
            newShot.shotYPosition = (enemy.lastYPosition == null ? enemy.initialYPosition : enemy.lastYPosition) + newShot.marginY;

            enemy.shots.push(newShot);
            this.enemies.push(enemy);
        }
    }

    setScore() {
        this.enemies.forEach((enemy) => {
            this.shots.forEach((shot) => {
                if (shot.shotXPositon >= ((enemy.lastXPosition == null ? enemy.initialXPosition : enemy.lastXPosition) - 5) && shot.shotXPositon <= ((enemy.lastXPosition == null ? enemy.initialXPosition : enemy.lastXPosition) + 30)) {
                    if (shot.shotYPosition <= (enemy.lastYPosition == null ? enemy.initialYPosition : enemy.lastYPosition)) {
                        this.score = (this.score == null ? 0 : this.score) + 1;

                        this.enemies.splice(this.enemies.indexOf(enemy), 1);
                        this.shots.splice(this.shots.indexOf(shot), 1);

                        document.getElementById('score-value').innerHTML = this.score.toString().padStart(6, '0');
                        document.getElementById('record-value').innerHTML = localStorage.getItem("space-record");

                        if ((localStorage.getItem("space-record") == null ? 0 : localStorage.getItem("space-record")) < this.score) {
                            localStorage.setItem("space-record", this.score);
                            document.getElementById('record-value').innerHTML = localStorage.getItem("space-record");
                        }
                    }
                }
            });
        });
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

        this.drawSpaceship(this.layoutPath);
    }

    drawFire() {
        let canvas = document.getElementById('canvas-area');
        let context = canvas.getContext('2d');

        this.clearCanvas();

        this.drawSpaceship(this.layoutPath);
        this.drawEnemies();

        this.shots.forEach((shot) => {
            let fire = new Image();
            fire.src = '../images/ball.png';

            shot.shotYPosition = shot.shotYPosition - 10;

            context.drawImage(fire, shot.shotXPositon, shot.shotYPosition);

            if (shot.shotYPosition <= 0) {
                this.shots.splice(this.shots.indexOf(shot), 1);
            }
        });

        context.restore();
    }

    drawEnemies() {
        let canvas = document.getElementById('canvas-area');
        let context = canvas.getContext('2d');
        let count = 0;

        this.clearCanvas();

        this.drawSpaceship(this.layoutPath);

        this.setScore();

        this.enemies.forEach((enemy) => {
            let enm = new Image();
            enm.src = '../images/enemy-spaceship.png';

            context.drawImage(enm, enemy.lastXPosition == null ? enemy.initialXPosition : enemy.lastXPosition, enemy.lastYPosition == null ? enemy.initialYPosition : enemy.lastYPosition);
        });

        context.restore();
    }
}