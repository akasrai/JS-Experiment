/**
 * All the game controlls are here
 */

 "use strict";

 class Game{

 	constructor(props){
 		
 		this.ufos = [];
 		this.playing= false;
		this.restart =false;
		this.ufoCounter	= 0;
		this.ufoInterval= 60; 		
		this.isUfoLoaded = false; 		
 		this.width 	= props.width;
 		this.height = props.height;
 		this.isBulletFired = false;
 		this.backgroundMusic = null;
 		this.$parent = props.$parent;

 		// CREATING CANVAS
 		this.$canvas = document.createElement('canvas');
 		this.$canvas.width = this.width;
    	this.$canvas.height = this.height;
 		this.$canvas.className = "gamepanel";
    	this.$canvas.backgroundColor= "transparent";
    	this.$parent.appendChild(this.$canvas);

		this.ctx = this.$canvas.getContext("2d", {
      		alpha: false,
    	});


    	this.gameAnimationLoop = this.gameAnimationLoop.bind(this);
 	}


 	// STARTING SCREEN
 	startScreen(KEY_STATUS) {

 		// PATTERN FOR HOMESCREEN
 		this.homeScreenPattern(0, 0, this.width, this.height);

 		// DRAWING TRAINGLE
		this.ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
		this.ctx.moveTo(this.width/2 - 250, 150); 
		this.ctx.lineTo(this.width/2 + 250, 150);
		this.ctx.lineTo(this.width/2, 550); 
		this.ctx.fill(); 

		// ADDING GRADIENT PATTERN
		let gradient = this.gradientTextColor();		

		// ADDING START TEXT
		this.ctx.font = "100px myfont";
		this.ctx.fillStyle = gradient;
		this.ctx.textAlign = "center";
		this.ctx.fillText("Space shooter", this.width/2, this.height/2);

		if(!this.restart)
			this.ctx.fillText("Start", this.width/2, this.height/2 + 120);
		
		
		this.eventHandler(KEY_STATUS, gradient);
			
 	} 


 	// HOME SCREEN PATTERN GENERATION
 	homeScreenPattern(x, y, width, height) {

 		// ADDING GRADIENT PATTERN
		let gradient = this.ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2 - 100);
			gradient.addColorStop("0","#4d0039");
			gradient.addColorStop("1","black");
		

		// CREATIN BACKGROUND PATTERN 
		( this.restart ) ? this.ctx.fillStyle = "rgba(204, 0, 0, 0.7)" : this.ctx.fillStyle = gradient; 
 		this.ctx.fillRect(x, y, width, height);

 		// BG PATTERN BOXES
 		for(let i = 0; i < width; i += 50){

 			for (let j = 0; j < height; j += 50) {
 				
 				// MULTI COLOR BORDERS
 				let r = parseInt(Math.random() * 400),
	  				g = parseInt(Math.random() * 400),
	  				b = parseInt(Math.random() * 400);

 				this.ctx.strokeStyle = 'rgb('+ r +','+ g +','+ b +')';
 				this.ctx.lineWidth = 0.3;
 				this.ctx.strokeRect(x + i, y +j, 50, 50); 				
 			}
 		}
 	}

 	// GRADUENT TEXT COLOR
 	gradientTextColor() {

 		let gradient = this.ctx.createLinearGradient(0,0,this.width,0);
			gradient.addColorStop("0","#0000cc");
			gradient.addColorStop("0.5","#ccccff");
			gradient.addColorStop("1.0","#0000cc");

		return gradient;
 	}
 	// EVENT HALDLER FUNCTION
 	eventHandler(KEY_STATUS, gradient){

 		// CLICK EVENT ON TEXT OF CANVAS
		this.$canvas.addEventListener('mousemove', function(event){

			let x = event.pageX,
  				y = event.pageY;

				if(!this.restart && ( x > this.width/2 - 140 && x < this.width/2 + 140 ) && 
					(y > this.height/2 +40 && y < this.height/2 + 120) && !this.playing){

					this.ctx.fillStyle = 'white';
					this.ctx.fillText("Start", this.width/2, this.height/2 + 120);
					this.$canvas.style.cursor = "pointer";
				
				}else if( !this.restart && !this.playing){

					this.$canvas.style.cursor = "default";	
					this.ctx.fillText("Start", this.width/2, this.height/2 + 120);
					this.ctx.fillStyle = gradient;				
				
				} else if( this.restart && ( x > this.width/2 - 140 && x < this.width/2 + 140 ) && 
					(y > this.height/2 +40 && y < this.height/2 + 100)){

					this.$canvas.style.cursor = "pointer";	
					this.ctx.fillText("Restart", this.width/2, this.height/2 + 100);
					this.ctx.fillStyle = "white";				
				
				} else if( this.restart && ( x > this.width/2 - 140 && x < this.width/2 + 140 ) && 
					(y > this.height/2 +120 && y < this.height/2 + 170)){

					this.$canvas.style.cursor = "pointer";	
					this.ctx.fillText("Quit", this.width/2, this.height/2 + 170);
					this.ctx.fillStyle = "white";				
				
				} else if(this.restart) {

					this.$canvas.style.cursor = "default";	
					this.ctx.fillText("Restart", this.width/2, this.height/2 + 100);
					this.ctx.fillText("Quit", this.width/2, this.height/2 + 170);
					this.ctx.fillStyle = gradient;	

				} else {

					this.$canvas.style.cursor = "default";	
				}

				

		}.bind(this));

		this.$canvas.addEventListener('click', function(event){

			let x = event.pageX,
  				y = event.pageY;

				if(!this.playing && ( x > this.width/2 - 140 && x < this.width/2 + 140 ) && 
					(y > this.height/2 +40 && y < this.height/2 + 120) && !this.restart){

					this.initBackground(KEY_STATUS);
				}

				if(this.restart && ( x > this.width/2 - 140 && x < this.width/2 + 140 ) && 
					(y > this.height/2 +40 && y < this.height/2 + 100)){

					this.resetObjects();
					this.initBackground(KEY_STATUS);
					this.restart = false;
				}

				if( this.restart && ( x > this.width/2 - 140 && x < this.width/2 + 140 ) && 
					(y > this.height/2 +120 && y < this.height/2 + 170)){

					this.resetObjects();
					this.ctx.clearRect(0, 0, this.width, this.height);
					this.restart = false;
					this.playing = false;
					this.startScreen();
				}

		}.bind(this));
 	}
 	
 	// CREATE CANVAS
 	initBackground(KEY_STATUS){
 		
 		this.playing = true;
  		this.ctx.clearRect(0, 0, this.width, this.height);
 		this.createObjects();
 		this.background.initStars();
 		this.gameAnimationLoop(KEY_STATUS);
 		this.shooter.loadShooter();
 		this.shooter.drawShooter();

 		this.gameScorePanel();
 		//this.backgroundMusic = new GameSound("sound/bg.mp3");
		//this.backgroundMusic.play();
 	}

 	// CREATES ALL THE REQUIRED OBJECTS
 	createObjects(){

 		// 3D BACKGROUND OBJECT
 		this.background = new Backgroun3d({
 			width 	: this.width,
 			height 	: this.height,
 			ctx		: this.ctx
 		});

 		// SHOOTER OBJECT
 		this.shooter = new Shooter({

 			width	: 120,
 			height	: 100,
 			x		: this.width/2 - 60,
 			y		: 500,
 			ctx		: this.ctx,
 			$parent	: this.$parent,
 			canvasWidth	: this.width,
 			canvasHeight : this.height
 		});
 	}

 	// UFO GENERATOE
 	generateUfos() {

 		let dir = [1,0,-1];

 		// UFO OBJECT
 		this.ufos[this.ufoCounter] = new Ufo({
 			width 	: 4,
 			height	: 1,
 			y		: 250,
 			ctx		: this.ctx,
 			canvasWidth	: this.width,
 			canvasHeight : this.height,
 			dx		: dir[Math.floor(Math.random() * dir.length)],
 			dy		: dir[Math.floor(Math.random() * dir.length)],
 			x		: Math.floor(Math.random() * (((this.width/2) + 100) - ((this.width/2) - 200)))  + ((this.width/2) - 200),
 		});

 		// if(!this.isUfoLoaded){
 			
 		// 	this.isUfoLoaded = true;
 		// }
 		this.ufos[this.ufoCounter].loadImages();
 		this.ufos[this.ufoCounter].drawUfo();
 		this.ufoCounter++;
 	}

 	// MAIN ANIMATION LOOP
 	gameAnimationLoop(KEY_STATUS){

 		if(this.playing){

 			this.animationId = requestAnimationFrame(this.gameAnimationLoop);
 			
 		} else {

 			this.restart = true;
 			this.gameOver();
 			return false;
 			// this.backgroundMusic.stop();
 		}

 		this.background.drawBackground(this.shooter);

 		if(this.ufoInterval <= 0){

 			this.generateUfos();
 			this.ufoInterval = 20;
 		}
 		if(!this.isBulletFired){

 			this.isBulletFired = this.shooter.flyShooter(KEY_STATUS);
 		}else{

 			this.shooter.flyShooter(KEY_STATUS);
 		}
 		

 		this.shooter.drawShooter();

 		this.flyUfos();

 		this.ufoUpdate();
 	
 		if(this.isBulletFired){

 			this.shooter.moveBullet(this.ufos);
 			
 		}

 		this.ufoInterval--;
 	};

 	// UFOS MOTION
 	flyUfos() {

 		this.ufos.forEach(function(ufo){

 			ufo.flyUfos();

 		}.bind(this));
 	};

 	// CHECK UFOS DESTROYED
 	ufoUpdate(){

 		let newArr = [];
		
		this.ufos.forEach(function(ufo) {
		    
		    if (ufo.y > this.height + 400 || ufo.y < -400 || ufo.life <= 0 ) {

		        
		    	
			} else if (ufo.x < (this.shooter.x + this.shooter.width) && (ufo.x + ufo.width) > this.shooter.x) {

				if( (ufo.y + ufo.height) > this.shooter.y + 20 && ufo.y < (this.shooter.y + this.shooter.height) ){
		    		
		    		this.playing = ufo.destroyUfosAndShooter(this.ufos, this.shooter);

				} else {

		    		newArr.push(ufo);
		    	}

		    } else  {
		    
		    	newArr.push(ufo);
		    }

		}.bind(this));

		this.ufos = newArr;
 	};

 	// GAME OVER SCREEN
 	gameOver() {

 		this.homeScreenPattern(this.width/2 - 300, this.height/2 - 150, 600, 400);
 		let gradient = this.gradientTextColor();	
 		this.ctx.font = "90px myfont";
		this.ctx.fillStyle = gradient;
		this.ctx.textAlign = "center";
		this.ctx.fillText("Game Over", this.width/2, this.height/2);

		this.ctx.font = "60px myfont";
		if(this.restart)
			this.ctx.fillText("Restart", this.width/2, this.height/2 + 100);
			this.ctx.fillText("Quit", this.width/2, this.height/2 + 170);
 	}

 	// GAME SCORE PANEL
 	gameScorePanel() {

 		this.ctx.fillStyle = "rgba(204, 0, 0, 0.7)"
 		this.ctx.fillRect(500,20, this.width, this.height)
 	}

 	// UPDATE SCORE
 	showGameScore(myScore){

 		let score = (myScore) ? myScore : 0;

 		this.ctx.fillStyle = "rgba(204, 0, 0, 0.7)"
 		this.ctx.fillRect(500,20, this.width, this.height)

 		this.ctx.fillStyle = "Green";
		this.ctx.textAlign = "center";
		this.ctx.fillText(score,500, 20);
 	}

 	// RESET GAME OBJECTS FOR RESTART
 	resetObjects() {

 		this.ufoCounter = 0;
 		this.ufos = [];
 		// this.shooter =

 		let resetScore = new Bullet({
 			x : 0,
 			y : 0 
 		});
 		resetScore.resetKillsScore();
 	}
 }