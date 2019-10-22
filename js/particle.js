var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');


var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;

var colorArray = [
	'#2C3E50',
	'#E74C3C',
	'#ECF0F1',
	'#3498DB',
	'#2980B9',

];

window.addEventListener('resize', function()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
})

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;

})

function Circle(x, y, dx, dy, radius){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minimRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function(){
		if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0){
			this.dx = -this.dx;
		}

		if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0){
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if(mouse.x - this.x < 100 && mouse.x - this.x > -50 
			&& mouse.y - this.y < 100 && mouse.y - this.y > -50
			) {
			if(this.radius < maxRadius){
			this.radius += 1;
			}
		} else if(this.radius > this.minimRadius){
			this.radius -= 1;
		}

		this.draw();
	}

}



var circleArray = [];
for(var i = 0; i < 1000; i++){
		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (window.innerWidth - radius * 2) + radius;
		var y = Math.random() * (window.innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5);
		var dy = (Math.random() - 0.5);
		circleArray.push(new Circle(x, y, dx, dy, radius));


	}

function init(){
	
	circleArray = [];


	
}

function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for(var i = 0; i < circleArray.length; i++)
	 {
		circleArray[i].update();
	}

}



animate();