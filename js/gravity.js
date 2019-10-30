var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var colors = [
	'#FFA53C',
	'#397368',
	'#B8D971',
	'#F2EC99',
	'#0278FF',
	'#F2F2F2',
	'#40012F'
];

var gravity = 0.2;
var friction = 1;


addEventListener("resize", function() {
	canvas.width = window.innerWidth;	
	canvas.height = window.innerHeight;
  init();
});




function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}



function Ball(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.color = color;

	this.update = function() {
		if (this.y + this.radius + this.dy> canvas.height) {
			this.dy = -this.dy;
			this.dx = this.dx * friction;
			this.dy = this.dy * friction;
		} else {
			this.dy += gravity;
		}

		if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
			this.dx = -this.dx * friction;
		}

		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	};

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
	};
}



var ballArray = [];

function init() {
	ballArray = [];

	for (let i = 0; i < 300; i++) {
		var radius = randomIntFromRange(8, 20);
		var x = randomIntFromRange(radius, window.innerWidth - radius);
		var y = randomIntFromRange(0, window.innerHeight - radius);
		var dx = randomIntFromRange(-3, 3)
		var dy = randomIntFromRange(-2, 2)
	    ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(colors)));
	}
}

function animation() {
	requestAnimationFrame(animation);

	c.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < ballArray.length; i++) {
		ballArray[i].update();
	}
}

init();
animation();
