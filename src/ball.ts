import { Vector } from "./vector";
export class Ball {
	pos: Vector;
	radius: number;
	speed: number;
	bounce = 0.6;
	gravity = 0;
	constructor(pos: Vector, radius: number) {
		this.pos = pos;
		this.speed = 0;
		this.radius = radius;
	}
	update(bottom: number) {
		// this.pos.y += this.speed;
		// this.speed += 0.2;
		this.gravity += 0.1;
		this.pos.y += this.speed + this.gravity;
		this.hitBottom(bottom);
	}
	hitBottom(bottom: number): void {
		if (this.pos.y > bottom - this.radius) {
			this.pos.y = bottom - this.radius / 2 - 10;
			this.gravity = -(this.gravity * this.bounce);
		}
	}
	draw(ctx: CanvasRenderingContext2D): void {
		ctx.beginPath();
		ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 360);
		ctx.stroke();
	}
	moveTo(toPos: Vector) {
		this.pos.x = toPos.x;
		this.pos.y = toPos.y;
	}
}
