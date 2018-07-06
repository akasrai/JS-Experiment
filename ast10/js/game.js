/**
 * All the game controlls are here
 */

 "use strict";

 class Game{

 	constructor(props){
 		
 		this.ufos = [];
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

 		let dir = [1,0,-1],
 			type = [0,1,2,3,4,5,6];

 		// UFO OBJECT
 		this.ufos[this.ufoCounter] = new Ufo({
 			width 	: 4,
 			height	: 1,
 			y		: 250,
 			ctx		: this.ctx,
 			canvasWidth	: this.width,
 			canvasHeight : this.height,
 			dx		:  dir[Math.floor(Math.random() * dir.length)],
 			dy		:  dir[Math.floor(Math.random() * dir.length)],
 			type 	: type[Math.floor(Math.random() * type.length)],
 			x		: Math.floor(Math.random() * (((this.width/2) + 100) - ((this.width/2) - 100)))  + ((this.width/2) - 100),
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

 		this.animationId = requestAnimationFrame(this.gameAnimationLoop);
 		this.background.drawBackground(this.shooter);

 		if(this.ufoInterval <= 0){

 			this.generateUfos();
 			this.ufoInterval = 60;
 		}
 		if(!this.isBulletFired){

 			this.isBulletFired = this.shooter.flyShooter(KEY_STATUS);
 		}else{

 			this.shooter.flyShooter(KEY_STATUS);
 		}
 		

 		if(this.isBulletFired){

 			this.shooter.moveBullet();
 			// isBulletFired.moveBullet(isBulletFired);
 		}
 		this.shooter.drawShooter();

 		this.flyUfos();

 		this.ufoInterval--;
 	}

 	// UFOS MOTION
 	flyUfos() {

 		this.ufos.forEach(function(ufo){

 			ufo.flyUfos();
 		}.bind(this));
 	}

 }