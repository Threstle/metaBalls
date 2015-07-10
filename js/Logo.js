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
	   