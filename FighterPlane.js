import { canvas, ctx } from "../canvas.js";

export class SpaceShip {
    constructor() {
        this.image = new Image();
        this.image.src = "./img/plane.png";
        this.size = { x: 100, y: 100 };

        this.posision = {
            x: canvas.width / 2,
            y: canvas.height / 2,
        };
        this.vel = { x: 0.6, y: 0 };
        this.force = { x: 0, y: 0 };
        this.maximalForce = 2;
        this.friction = 0.99;
        this.rotation = 0
        this.rotationVel = 0;
        this.rotationForce = 0;
        this.rotationMaximalForce = 0.03;
        this.rotationFriction = 0.95;
        this.addControls();
    }

    update() {
        this.vel.x += this.force.x;
        this.vel.y += this.force.y;
        this.force.x = 0;
        this.force.y = 0;
        this.posision.x += this.vel.x;
        this.posision.y += this.vel.y;
        this.vel.x *= this.friction ;
        this.vel.y *= this.friction; 
        this.rotationVel += this.rotationForce;
        this.rotationForce = 0;
        this.rotation += this.rotationVel;
        this.rotationVel *= this.rotationFriction;
        this.handleTinyVel();
    }

    handleTinyVel(threshold = 0.01) {
        if (Math.abs(this.vel.x) < threshold) {
            this.vel.x = 0;
        }
        if (Math.abs(this.vel.y) < threshold) {
            this.vel.y = 0;
        }

        if (Math.abs(this.rotationVel) < threshold) {
            this.rotationVel = 0;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.posision.x, this.posision.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(
            this.image,
            this.size.x,
            this.size.y,
            -this.size.x / 2,
            -this.size.y / 2,
            this.size.x,
            this.size.y
        );

        ctx.restore();
    }

    addControls() {
        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "ArrowUp":
                    this.boost({ direction: "forwards" });
                    break;
                case "ArrowDown":
                    this.boost({ direction: "backwards" });
                    break;
                case "ArrowLeft":
                    this.turn({ direction: "left" });
                    break;
                case "ArrowRight":
                    this.turn({ direction: "right" });
                    break;
            }
        });
    }

    turn({ direction }) {
        const sign = direction == "right" ? +1 : -1;
        this.rotationForce = sign * this.rotationMaximalForce;
    }

    boost({ direction }) {
        const sign = direction == "forwards" ? +1 : -1;
        this.force = {
            x: sign * this.maximalForce * Math.cos(this.rotation),
            y: sign * this.maximalForce * Math.sin(this.rotation),
        };
    }
}