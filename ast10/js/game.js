/**
 * All the game controlls are here
 */

 "use strict";

 class Game{

 	constructor(props){
 		
 		this.ufos = [];
		this.playing= true;
		this.ufoCounter	= 0;
		this.ufoInterval= 60; 		
		this.isUfoLoaded = false; 		
 		this.width 	= props.width;
 		this.height = props.height;
 		this.isBulletFired = false;
 		this.$parent = props.$parent;
 		this.$canvas = document.createElement('canvas');
 		this.$canvas.width = this.width;
    	this.$canvas.height = this.height;
 		this.$canvas.className = "gamepanel";
    	this.$canvas.style.backgroundColor = "black";

    	this.$parent.appendChild(this.$canvas);

		this.ctx = this.$canvas.getContext("2d", {
      		alpha: false,
    	});

    	this.gameAnimationLoop = this.gameAnimationLoop.bind(this);
 	}

 	// CREATE CANVAS
 	initBackground(KEY_STATUS){
 		// console.log(KEY_STATUS);
 		this.createObjects();
 		this.background.initStars();
 		this.gameAnimationLoop(KEY_STATUS);
 		this.shooter.loadShooter();
 		this.shooter.drawShooter();
 		// this.shooter.drawShooterDiv();
 		// this.ufo.loadImages();
 		// this.ufo.drawUfo();
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
 			
 		}
 		this.background.drawBackground(this.shooter);

 		if(this.ufoInterval <= 0){

 			this.generateUfos();
 			this.ufoInterval = 50;
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
 			// isBulletFired.moveBullet(isBulletFired);
 		}

 		this.ufoInterval--;
 	}

 	// UFOS MOTION
 	flyUfos() {

 		this.ufos.forEach(function(ufo){

 			ufo.flyUfos();

 		}.bind(this));
 	}

 	// CHECK UFOS DESTROYED
 	ufoUpdate(){

 		let newArr = [];
		
		this.ufos.forEach(function(ufo) {
		    
		    if (ufo.y > this.height + 400 || ufo.y < -400 || ufo.life <= 0 ) {

		        this.ufos.splice(ufo, 1);
		    	
			} else if (ufo.x < (this.shooter.x + this.shooter.width) && (ufo.x + ufo.width) > this.shooter.x) {

				if( (ufo.y + ufo.height) > this.shooter.y && ufo.y < (this.shooter.y + this.shooter.height) ){
		    		
		    		this.playing = ufo.destroyUfosAndShooter(this.ufos, this.shooter);

				} else {

		    		newArr.push(ufo);
		    	}

		    } else  {
		    
		    	newArr.push(ufo);
		    }

		}.bind(this));

		this.ufos = newArr;

		// console.log(this.ufos.length);
 	}

 }