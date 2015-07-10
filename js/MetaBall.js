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