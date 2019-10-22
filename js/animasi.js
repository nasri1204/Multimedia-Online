//pazzle

var sprites=[], targets=[];
function startGame() {
   myApp.start();

   //1-5
   for(var i=1; i<6; i++)
   {
      sprites[i]=new sprite('assets/obj_'+i+'.jpg',700,i*95); 
      targets[i]=new sprite('assets/trg_'+i+'.jpg',i*95,95);      
      dragable(sprites[i],targets[i]);
   }

   //6-10
   for(var i=6; i<11; i++)
   {
      sprites[i]=new sprite('assets/obj_'+i+'.jpg',795,(i-5)*95); 
      targets[i]=new sprite('assets/trg_'+i+'.jpg',(i-5)*95,190);      
      dragable(sprites[i],targets[i]);
   }

   //11-15
   for(var i=11; i<16; i++)
   {
      sprites[i]=new sprite('assets/obj_'+i+'.jpg',890,(i-10)*95); 
      targets[i]=new sprite('assets/trg_'+i+'.jpg',(i-10)*95,285);      
      dragable(sprites[i],targets[i]);
   }

   //16-20
   for(var i=16; i<21; i++)
   {
      sprites[i]=new sprite('assets/obj_'+i+'.jpg',985,(i-15)*95); 
      targets[i]=new sprite('assets/trg_'+i+'.jpg',(i-15)*95,380);      
      dragable(sprites[i],targets[i]);
   }

   //21-25
   for(var i=21; i<26; i++)
   {
      sprites[i]=new sprite('assets/obj_'+i+'.jpg',1080,(i-20)*95); 
      targets[i]=new sprite('assets/trg_'+i+'.jpg',(i-20)*95,475);      
      dragable(sprites[i],targets[i]);
   }
}
var myApp = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);  
        this.interval = setInterval(appLoop, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function sprite(url,x,y)
{
    this.x=x;
    this.y=y;
    this.width=100;
    this.height=100;
    var ctx=myApp.context;
    var imgObject= new Image();
    imgObject.src = url; 
    ctx.drawImage(imgObject,this.x,this.y);   
    this.update=function()
    {
        ctx.drawImage(imgObject,this.x,this.y);   
    }
   
}

function appLoop()
{
    myApp.clear();  
    for(var i=1; i<26;i++)
    {
        targets[i].update();
        //sprites[i].update();
    }
    for(var i=1; i<26;i++)
    {
        //targets[i].update();
        sprites[i].update();
    }
}

function dragable(sprite,target)
{
    var offsetX, offsetY;
    document.body.addEventListener('mousedown',function(e)
    {      
        offsetX=e.clientX-sprite.x;
        offsetY=e.clientY-sprite.y;
        //mendeteksi pointer klik diatas objek lewat fungsi mouseIsOver
        if(mouseIsOver(e.clientX,e.clientY,sprite))
        {
          //jika klik diatas objek, deteksi pergerakan mouse dan kondisi saat mouse lepas
          //panggil fungsi mouseMove saat pointer bergerak
          document.body.addEventListener('mousemove',mouseMove);
          //panggil fungsi mouseUp saat pointer lepas
          document.body.addEventListener('mouseup',mouseUp);
        }     
    });  
    function mouseMove(e)
    {
      //gambar objek baru lewat fungsi draw() dengan posisi x dan y sama dengan posisi x dan y pointer
      //menambahkan faktor offset agar posisi drag objek tidak bergeser
      sprite.x=e.clientX-offsetX, sprite.y=e.clientY-offsetY;     
    };
    function mouseUp(e)
    {
      //hapus event untuk mousemove dan mouseup agar kondisi kembali seperti semula
      document.body.removeEventListener('mousemove',mouseMove);
      document.body.removeEventListener('mouseup',mouseUp);
      calculateDistance();
    }
    //fungsi untuk mendeteksi posisi pointer diatas objek
    function mouseIsOver (mouseX,mouseY,obj)
    {
      if(mouseX>obj.x && mouseX < obj.x+obj.width && mouseY > obj.y && mouseY<obj.y+obj.height)
      return true;
      else return false;
    }
    //menghitung jarak antara sprite dengan target
    function calculateDistance()
    {
        var dist=Math.sqrt(((sprite.x-target.x)*(sprite.x-target.x))+((sprite.y-target.y)*(sprite.y-target.y)));       
        if(dist<30){
          sprite.x=target.x;
          sprite.y=target.y;
        }
    }
};


//particle

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.insertBefore(canvas, document.body.childNodes[0]);

var c = canvas.getContext('2d');



var colorArray = [
	'#01D5D9',
	'#FC7673',
	'#F74B61',
	'#FBBFBF',
	'#85E5F1',

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

		this.draw();
	}

}



var circleArray = [];
for(var i = 0; i < 500; i++){
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

startGame();
animate();
