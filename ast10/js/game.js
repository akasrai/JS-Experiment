/**
 * All the game controlls are here
 */

 "use strict";

 class Game{

 	constructor(props){
 		
 		this.width 	= props.width;
 		this.height = props.height;
 		this.$parent = props.$parent;
 		this.isBulletFired = false;
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
 		this.shooter.drawShooterDiv();
 		// this.ufos.drawUfo(this.ctx);
 	}

 	// CREATES ALL THE REQUIRED OBJECTS
 	createObjects(){

 		// 3D BACKGROUND OBJECT
 		this.background = new Backgroun3d({
 			width 	: this.width,
 			height 	: this.height,
 			ctx		: this.ctx
 		});

 		// UFO OBJECTS
 		this.ufos = new Ufo({
 			width  : 100,
 			height : 100,
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

 	// MAIN ANIMATION LOOP
 	gameAnimationLoop(KEY_STATUS){

 		this.animationId = requestAnimationFrame(this.gameAnimationLoop);
 		this.background.drawBackground(this.shooter);

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
 	}

 }