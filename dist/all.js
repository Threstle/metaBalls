var Logo = function(domElement,w,h,nbBalls){
	
	this.minThresh = 0.00001;
	this.maxThresh = 100;
	this.metaTab = [];
	this.nbBalls = nbBalls
	this.width = w;
	this.height = h;

	this.canvas = document.createElement('canvas');
	this.context = this.canvas.getContext('2d');
	domElement.appendChild(this.canvas);
	this.canvas.width = this.width + (w/5);
	this.canvas.height = this.height + (h/5);

	this.fill();

}

// On remplit le canvas de metaBalls
Logo.prototype.fill = function(domElement) {
	for(var i = 0; i < this.nbBalls; i++){
		this.metaTab[i] = new MetaBall(Math.random()*this.width,Math.random()*this.height,this.canvas);
	}
};

Logo.prototype.refresh = function() {
	for(var i = 0; i < this.metaTab.length; i++){
		this.metaTab[i].move();
	}
	this.context.fillStyle = "rgba(255,255,255,0.7)";
	this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	var i = this.canvas.width;
	while(i>0){
		var j = this.canvas.height;
		while(j>0){
				var sum = 0;
				for(var k = 0; k < this.metaTab.length; k++){
					//On additionne le poids de chaque metaball sur chaque pixel du canvas.
					sum += this.metaTab[k].draw(i,j);
					
					
				}
				//Si le poids sur le pixel est entre 1 et 1.3, alors on le dessine.
				if(sum > 1 && sum < 1.3){
				this.context.fillStyle = "rgba(200,250,200,"+sum+")";
				this.context.fillRect(i,j,1,1);
				}
			j--;
		}
		i--;
	}

	

};
	   
		var MetaBall = function(x,y,canvas){
			this.x0 = x;
			this.y0 = y;
			this.r = 10;
			this.dirX = 7*Math.random();
			this.dirY = 7*Math.random();
			this.tailleCanvas = {w:canvas.width-50,h:canvas.height-50};
		}

		//Retourne le poids de la metaball à l'emplacement xy.
		MetaBall.prototype.draw = function(x,y){
			var ratio = this.r/Math.sqrt((x-this.x0)*(x-this.x0) + (y-this.y0)*(y-this.y0))
			return ratio;
		}

		MetaBall.prototype.move = function(){
			var rand = Math.random();
			if(rand < 0.5){
				this.x0 += 1;
			}
			else if(rand > 0.5){
				this.x0 -= 1;
			}
			rand = Math.random();
			if(rand < 0.5){
				this.y0 += 1;
			}
			else if(rand > 0.5){
				this.y0 -= 1;
			}
			this.x0 += this.dirX;
			this.y0 += this.dirY;
			this.collide();
		}
		
		//Si la metaball touche un bord, elle repart dans la direction inverse.
		MetaBall.prototype.collide = function(){
			if(this.x0 > this.tailleCanvas.w){
				this.x0 = this.tailleCanvas.w-10;
				this.dirX = -this.dirX;
				this.dirY = -this.dirY;
			}
			if(this.y0 > this.tailleCanvas.h){
				this.y0 = this.tailleCanvas.h-10;
				this.dirX = -this.dirX;
				this.dirY = -this.dirY;
			}
			if(this.x0 < 0+50){
				this.x0 = 0+60;
				this.dirX = -this.dirX;
				this.dirY = -this.dirY;
			}
			if(this.y0 < 0+50){
				this.y0 = 0+60;
				this.dirX = -this.dirX;
				this.dirY = -this.dirY;
			}
		}
var logo = new Logo(document.body,250,250,7);


function refresh(){
	logo.refresh();
		requestAnimationFrame(refresh);
};
refresh();	
