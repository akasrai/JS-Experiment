
function Ball(props){

	var direction	= [-1,1];

	this.width		= props.width || 30;
	this.height		= props.height || 30;
	this.x			= props.x || Math.floor(Math.random() * 100);
	this.y			= props.y || Math.floor(Math.random() * 100);
	this.dx			= direction[Math.floor(Math.random() * direction.length)];
	this.dy			= direction[Math.floor(Math.random() * direction.length)];
	this.$parent	= props.$parent;
	this.speed		= props.speed || 15;
	this.containerHeight	= props.containerH;
	this.containerWidth		= props.containerW;
	this.ballid 			= props.ballid;
	this.backgroundImage	= ( this.dx === 1) ?  "url('images/fish_right.png')" : "url('images/fish_left.png')";
	this.score				= 0;

	//THIS IS NOW SET TO SELF SO THAT PRIVATE FUNCTION CAN ACCESS THIS PROPERTIES
	var self = this;

	// CREATING DIV FOR BALL
	this.$elem = document.createElement("div");

	// PUBLIC FUNCTION STARTS WITH THIS.
	this.initBalls = function(){
		self.$elem.className 		= "ball";
	    self.$elem.style.width 		= self.width+"px";
	    self.$elem.style.height 	= self.height+"px";
	    //self.$elem.style.background = generateRandomColor();

	   	self.$elem.style.backgroundImage = self.backgroundImage;	   
	    self.$elem.style.position 	= "absolute";
	    self.$elem.style.borderRadius 	= "100%";
	  
	    plotPosition();
	    self.$parent.appendChild(self.$elem);
	    
	}

	// UPDATING THE POSITIONS FOR MOVING THE BALLS 
	this.updateBallPosition = function(){

		this.x += this.dx * self.speed;
    	this.y += this.dy * self.speed;

	}

	// MOVING THE BALLS
	this.bounceBall = function(){

		plotPosition();
	}

	this.uniqueBallPosition = function(ballCount, pos){
	
		var newXPos = Math.floor(Math.random() * self.containerWidth);
		var newYPos = Math.floor(Math.random() * self.containerHeight);
		
		for(var i = 0; i < balls.length; i++){

			while(i < balls.length){

				if(((Math.abs( balls[i].x - newXPos)) < 30 ) && (Math.abs( balls[i].y - newYPos)) < 30){
					
					newXPos =  Math.floor(Math.random() * (self.containerWidth - self.width));
					newYPos =  Math.floor(Math.random() * (self.containerHeight - self.width));
					
				}else{					
					break;
				}
			}
		}

		if(pos === "x"){
			return newXPos;

		}else{
			return newYPos;
		}

	}

	// CREATING PRIVATE FUNCTION AS FOLLOWS
	var generateRandomColor = function(){
		var r = parseInt(Math.random() * 300);
	  	var g = parseInt(Math.random() * 300);
	  	var b = parseInt(Math.random() * 300);
	  	var color = 'rgba(' + r + ', ' + g + ', ' + b + ', 0.8)';
	  	return color;
	}

	// PLOTING THE POSITION
	var plotPosition = function(){
		self.$elem.style.top	= self.y + "px";
		self.$elem.style.left	= self.x + "px";
		self.$elem.style.backgroundImage	= self.backgroundImage;
	}

	// CHECKING BOUNDRY COLLISION
	this.checkBoundryCollision = function(){

		var containerTop = 0;
		var containerLeft = 0;
		var containerRight = self.containerWidth;
		var containerBottom = self.containerHeight;

		if(self.y <= containerTop || self.y >= containerBottom){
			
			if(self.y <= containerTop){ self.y    = 0};
			if(self.y >= containerBottom){ self.y = containerBottom - self.width};

			self.dy = -(self.dy);
		}
		if(self.x <= containerLeft || self.x >= containerRight){
			
			if(self.x <= containerLeft){

				self.x  = 0;
				self.backgroundImage ="url('images/fish_right.png')";
			}
			if(self.x >= containerRight){ 

				self.x = containerRight - self.width;
				self.backgroundImage ="url('images/fish_left.png')";
			}

			self.dx = -(self.dx);
		}	
	}

	// PUBLIC CHECKING INTER COLLISION
	this.checkInterCollision = function(){

		for(var i = 0; i < balls.length; i++){

			for(var j = i+1; j < balls.length; j++ ){
				
			    var dx = balls[i].x - balls[j].x,
	        		dy = balls[i].y - balls[j].y;
	        	
			    var distance  = Math.sqrt(dx * dx + dy * dy);
			    var radiusSum = self.width;

			    if(distance <= radiusSum){

			    	if(balls[i].collision == 0 || balls[j].collision == 0 ){

						balls[i].collision = 1;						    	
						balls[j].collision = 1;						    	
				    	collisionBounce(balls[i], balls[j]);
				    }

			   }else{

			   		// console.log(distance);
					balls[i].collision = 0;						    	
					balls[j].collision = 0;		   	
			   }
			}
		}

	}

	// PRIVATE FUNCTION FOR BOUNCING BALLS
	var collisionBounce = function(ball1, ball2){

		var maxSpeed = 5, 
			minSpeed = 1;

		// FORCEFULLY TAKING OUT BALL OUT OF CONTACT AFTER COLLISION
		ball1.x    += self.width;

		// CHANGING THE DIRECTION OF BALL
		ball1.dx 	= -(ball1.dx);
		ball1.dy 	= -(ball1.dy);
		ball2.dx 	= -(ball2.dx);
		ball2.dy 	= -(ball2.dy);

		// CHANGING THE BG FISH DIRECTION
		if(ball1.dx === 1 ){

			ball1.backgroundImage ="url('images/fish_right.png')";
		}else{

			ball1.backgroundImage ="url('images/fish_left.png')";
		}
		if(ball2.dx === 1 ){

			ball2.backgroundImage ="url('images/fish_right.png')";
		}else{

			ball2.backgroundImage ="url('images/fish_left.png')";
		}

		// CHANGING THE SPEED OF BALL AFTER COLLISION
		ball1.speed = Math.floor(Math.random() * maxSpeed) + minSpeed;
		ball1.speed	= Math.floor(Math.random() * maxSpeed) + minSpeed;
		ball2.speed	= Math.floor(Math.random() * maxSpeed) + minSpeed;
		ball2.speed	= Math.floor(Math.random() * maxSpeed) + minSpeed;
	}

	// FUNCTION TO INITIALIZE BALL POSITION TO DELETE
	this.ballDestroy = function(){

		self.$elem.onclick = function(){
		
			var time = 10;
			
			var destrySoundImageLoop = setInterval(function(){

				self.backgroundImage ="url('images/fire2.gif')";
				destroyedSound = new GameSound("sound/sound.mp3");
				destroyedSound.play();

				if(time === 0){
					clearInterval(destrySoundImageLoop);

					// REMOVES BALL FROM PARENT
					self.$parent.removeChild(self.$elem);
					
					// GETTING INDEX TO DELETE
					var removeIndex = balls.indexOf(self);

					// DELETING FROM ARRAY
					balls.splice(removeIndex, 1);

					// SCORE IS STORED IN GLOBAL VARIABLE
					score += 2;
					console.log(balls.length);
				}

				time--;

			},10);
		} 
		//console.log(self.score);
	}

	
} 


