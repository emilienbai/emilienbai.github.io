const speed = 2 * 6;

class Bubble{
	constructor(x, y, diameter, moving){
		this.moving = moving;
		this.x = x;
		this.y = y;
		this.diameter = diameter;
		this.speedX = speed/2 - Math.floor((Math.random()*speed));
		this.speedY = speed/2 - Math.floor((Math.random()*speed));
		this.hue = Math.floor((Math.random() * 256));
	}

	move(){
		if(this.moving == true){
			this.x = this.x + this.speedX;
			this.y = this.y + this.speedY;
			this.alterSpeed();
		}
	}

	draw(){
		strokeWeight(1);
		noFill()
		stroke(this.hue, 255, 255)
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}

	checkCollision(canvasWidth, canvasHeight){
		if((this.x - this.diameter/2 < 0) || (this.x + this.diameter/2 > canvasWidth)) {
			this.speedX = -this.speedX;
		}
		if((this.y - this.diameter/2 < 0) || (this.y + this.diameter/2 > canvasHeight)){
			this.speedY = -this.speedY;
		}
	}

	increaseDiameter(){
		if(this.diameter < 100){
			this.diameter += 1;
		}
	}
	alterSpeed(){
		this.speedX += (10 - Math.random()*20)/90;
		this.speedY += (10 - Math.random()*20)/90
	}
}

let currentBubble = null;
let array = [];
back = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB);
	e = new Bubble(windowWidth/2, windowHeight/2, 30, true);
	array.push(e);
}

function draw() {
	background(back);
	frameRate(60);

	if(currentBubble != null){
		currentBubble.increaseDiameter();
	}

	array.forEach(function(element) {
		element.move();
		element.draw();
		element.checkCollision(windowWidth, windowHeight);
	}, this);
	
}

function mousePressed() {
	currentBubble = new Bubble(mouseX, mouseY, 10, 10, false);
	array.push(currentBubble);
	return false;
}

function mouseReleased() {
	currentBubble.moving = true;
	currentBubble = null;
}





