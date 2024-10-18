const DISPLAY_HEIGHT = 600;
const DISPLAY_WIDTH = 800;
export class Game {
	balls: Ball[];
	cloud: Cloud;
	input: InputHandler;
	constructor() {
		this.cloud = new Cloud(new Vector(80, 80));
		this.balls = [];
		this.input = new InputHandler();
	}
	update(): void {
		this.cloud.update(this.input);
	}
	draw(ctx: CanvasRenderingContext2D): void {
		this.cloud.draw(ctx);
		for (const ball of this.balls) {
			ball.draw(ctx);
		}
	}
}
class Vector {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}
export class Ball {
	pos: Vector;
	radius: number;
	constructor(pos: Vector, radius: number) {
		this.pos = pos;
		this.radius = radius;
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

class Cloud {
	pos: Vector;
	constructor(pos: Vector) {
		this.pos = pos;
	}
	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillRect(this.pos.x, this.pos.y, 80, 80);
	}
	update(e: InputHandler): void {
		console.log(e.pos.x);
		this.pos.x = e.pos.x;
	}
}

function animate(ctx: CanvasRenderingContext2D, game: Game): void {
	ctx.clearRect(0, 0, DISPLAY_WIDTH, DISPLAY_HEIGHT);
	game.update();
	game.draw(ctx);

	requestAnimationFrame(() => {
		animate(ctx, game);
	});
}
class InputHandler {
	pos: Vector;
	constructor() {
		this.pos = new Vector(0, 0);
	}
}

window.onload = () => {
	const canvas = document.getElementById("game") as HTMLCanvasElement;
	canvas.width = DISPLAY_WIDTH;
	canvas.height = DISPLAY_HEIGHT;
	const ctx = canvas.getContext("2d");
	if (ctx != null) {
		const game = new Game();
		animate(ctx, game);

		canvas.addEventListener("mousemove", (e) => {
			console.log(game);
			game.input.pos.x = e.x;
		});
	}
};
