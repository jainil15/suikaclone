import { Vector } from "./vector";
export class Ball {
	pos: Vector;
	radius: number;
	constructor(pos: Vector, radius: number) {
		this.pos = pos;
		this.radius = radius;
	}
	update() {
		this.pos.y++;
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
