var width = 700, height= 600, pi=Math.PI;
var UpArrow=38, DownArrow=40;
var canvas, ctx, keystate;
var player, ai, ball;	


player = {
	x: null,
	y: null,
	width: 20,
	height: 100,
	
	update: function() {
		if(keystate[UpArrow]) this.y -=7;
		if(keystate[DownArrow]) this.y +=7;
		this.y = Math.max(Math.min(this.y, height - this.height), 0);
	},
	draw: function(){
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};

ai = {
	x: null,
	y: null,
	width: 20,
	height: 100,
	
	update: function() {
		var desty = ball.y - (this.height - ball.side)*0.5;
		this.y += (desty - this.y) * 0.1;
		this.y = Math.max(Math.min(this.y, height - this.height), 0);
	},
	draw: function(){
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
};

ball = {
	x: null,
	y: null,
	vel: null,
	side: 20,
	speed: 10,

	serve: function(side){
		var r = Math.random();
		this.x = side===1 ? player.x+player.width : ai.x - this.side;
		this.y = (height - this.side)*r;

		var phi = 0.1*pi*(1 - 2*r);
		this.vel = {
			x: side*this.speed*Math.cos(phi),
			y: this.speed*Math.sin(phi)
		}
	},
	update: function() {
		this.x += this.vel.x;
		this.y += this.vel.y;

		if(0 > this.y || this.y+this.side > height){
			var offset = this.vel.y < 0 ? 0 - this.y : height - (this.y+this.side);
			this.y += offset;
			this.vel.y *= -1;
		}
		var AABBIntersect = function(ax, ay, aw, ah, bx, by, bw, bh ){
			return ax < bx+bw && ay < by+bh && bx < ax+aw && by < ay+ah;
		};
		var pdle = this.vel.x < 0 ? player : ai;
		if(AABBIntersect(pdle.x, pdle.y, pdle.width, pdle.height, this.x, this.y, this.side, this.side)
		){
			this.x = pdle===player ? player.x+player.width : ai.x - this.side;
			var n = (this.y+this.side - pdle.y)/(pdle.height+this.side);
			var phi = 0.25*pi*(2*n - 1);

			var smash = Math.abs(phi) > 0.2*pi ? 1.5 : 1;
			this.vel.x = smash*(pdle===player ? 1 : -1)*this.speed*Math.cos(phi);
			this.vel.y = smash*this.speed*Math.sin(phi);
		}
		if (0 > this.x+this.side || this.x > width){
			this.serve(pdle===player ? 1 : -1);
		}
	},
	draw: function(){
		ctx.fillRect(this.x, this.y, this.side, this.side);
	}
};

function main(){
	canvas = document.getElementById("canvas");
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);

	keystate = {};
	document.addEventListener("keydown", function(e){
		keystate[e.keyCode] = true;
	});
	document.addEventListener("keyup", function(e){
		delete keystate[e.keyCode];
	});

	init();

	var loop = function(){
		update();
		draw();

		window.requestAnimationFrame(loop, canvas);
	};
	window.requestAnimationFrame(loop, canvas);
}

function init(){
	player.x = player.width;
	player.y = (height - player.height)/2;

	ai.x = width - (player.width + ai.width);
	ai.y = (height - ai.height)/2;

	ball.serve(1);
}

function update(){
	ball.update();
	player.update();
	ai.update();

	
}

function draw(){

	ctx.fillRect(0, 0, width, height);


	ctx.save();
	ctx.fillStyle = "white";

	ball.draw();
	player.draw();
	ai.draw();

	
	var w = 4;
	var x = (width - w)*0.5;
	var y = 0;
	var step = height/20;
	while(y < height){
		ctx.fillRect(x, y+step*0.5, w, step*0.5);
		y += step;
	}
	ctx.restore();

}

main();