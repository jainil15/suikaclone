import { Ball } from "./ball";
import { Box } from "./box";
import { Cloud } from "./cloud";
import { InputHandler } from "./inputhandler";
import { Vector } from "./vector";

export class Game {
	balls: Ball[];
	cloud: Cloud;
	box: Box;
	input: InputHandler;
	canvas: HTMLCanvasElement;
	constructor(canvas: HTMLCanvasElement) {
		this.cloud = new Cloud(new Vector(80, 80));
		this.balls = [];
		this.input = new InputHandler(canvas);
		this.box = new Box(400, 400);
		this.input.addPointerMoveHandler((e: PointerEvent) =>
			this.handlePointerMove(e),
		);
		this.input.addPointerClickHandler((e: PointerEvent) =>
			this.handlePointerClickHandler(e),
		);
		this.canvas = canvas;
	}
	handlePointerMove(e: PointerEvent): void {
		const rect = this.canvas.getBoundingClientRect();
		this.cloud.pos.x = e.clientX - rect.x - 50;
	}
	handlePointerClickHandler(e: PointerEvent): void {
		const rect = this.canvas.getBoundingClientRect();
		const cloudPos = new Vector(e.clientX - rect.x, e.clientY);
		this.balls.push(new Ball(cloudPos, 10));
	}
	update(): void {
		for (let i = 0; i < this.balls.length; i++) {
			this.balls[i].update();
			if (this.balls[i].pos.y > 200) {
				this.balls.splice(i, 1);
			}
		}
	}
	draw(ctx: CanvasRenderingContext2D): void {
		this.cloud.draw(ctx);
		this.box.draw(ctx);
		for (const ball of this.balls) {
			ball.draw(ctx);
		}
	}
}
