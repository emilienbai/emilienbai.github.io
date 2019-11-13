let f=null; 
const gravity = 1;
let interval = 500;
let lastGenerated = -1;
let timer = Date.now()
const fireworks = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	f = new Firework(windowWidth/2, windowHeight-15);
	angleMode(DEGREES);
}

function draw() {
	background(0)	
	for (let i = fireworks.length -1; i >= 0; i--){
		fireworks[i].draw();
		fireworks[i].moveBall();
		if(fireworks[i].dead){
			fireworks.splice(i,1);
		}
	}
	newFirework();
}

function newFirework() {
	const now = Date.now()
	if( now > lastGenerated + interval){
		lastGenerated = Date.now();
		let f = new Firework(random(20, windowWidth-20), windowHeight)
		fireworks.push(f);
		interval=random(300,800);
	}
}

class Firework{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.exploded = false
		this.color = color(random(0, 255),random(0, 255),random(0, 255));
		this.speedY = random(30, 35);
		this.particles = [];
		this.dead = false;
	}

	draw(){
		fill(this.color);
		if(! this.exploded){
			fill(255,255,255);
			ellipse(this.x, this.y, 10, 10);	
		}else {
			for(let i = this.particles.length-1;  i>=0; i--){
				this.particles[i].drawParticle();
				if(this.particles[i].moveParticle()){
					this.particles.splice(i,1);
				}
				if(this.particles.length == 0){
					this.dead = true;
				}
			}
		}
	}

	moveBall(){
		if (! this.exploded){
			this.y = this.y - this.speedY;
			this.speedY -= gravity;
			if(this.speedY < 0){
				this.explode();
			}
		}
	}

	explode() {
		this.exploded = true;
		for(let i = 0; i< 100; i++){
			this.particles.push(new Particle(this.x, this.y, random(0, 360)));			
		}
	}
}

class Particle{
	constructor(x, y, angle){
		this.x = x;
		this.y = y;
		this.speedX = random(1, 8) * Math.cos(angle);
		this.speedY = -4 + random(1, 8) * Math.sin(angle);
	}

	drawParticle(){
		ellipse(this.x, this.y, 5, 5)
	}

	moveParticle(){
		this.x += this.speedX;
		this.y += this.speedY;
		this.speedY += gravity/4;
		return this.y > windowHeight+15;
	}
}