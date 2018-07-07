/**
 * Shooter 
 **/

  "use strict";

  class Shooter{

 	constructor(props){

 		this.counter= 0;
 		this.fireRate= 5;
 		this.bullets = [];
 		this.bulletCount = 0;
 		this.ctx	= props.ctx;
 		this.$parent= props.$parent;
 		this.x 	 	= props.x || 100;
 		this.y 		= props.y || 100;
 		this.dx 	= props.dx || 0;
 		this.dy 	= props.dy || -1;
 		this.life 	= props.life || 2;
 		this.speed 	= props.speed || 15;
 		this.width 	= props.width || 100;
 		this.height = props.height || 100;
 		this.canvasWidth	= props.canvasWidth;
 		this.canvasHeight	= props.canvasHeight;
 		

 		this.shooterLoaded = false;
 		this.shooterImage = null;
 		// this.drawShooter = this.drawShooter.bind(this);
 	}

 	// DRAW UFOS
 	drawShooter(){
 	
 		if(this.shooterLoaded){
 		  
 		   	this.ctx.drawImage(this.$shooterImage, this.x, this.y, this.width, this.height);
	    		
 		}else{
 		
 			console.log("Shooter image not loaded");
 		}
		
 	}

 	// LOAD UFOS
 	loadShooter(){

 		this.$shooterImage = new Image();
	 	this.$shooterImage.src = "images/shooter.gif";

 		if(!this.shooterLoaded){
 						
			this.$shooterImage.onload = function(){
	
				this.shooterLoaded = true;
		      
	    	}.bind(this);
 				
 		}
 	}

 	// DRAW SHOOTER USING DIV
 	drawShooterDiv(){

 		let $shooter = document.createElement("div");
 		$shooter.style.width = this.width + "px";
 		$shooter.style.height = this.height + "px";
 		$shooter.style.backgroundColor = "red";
 		$shooter.style.className = "shooter";

 		this.$parent.appendChild($shooter);
 	}

 	// MOVE THE SHOOTER
 	flyShooter(){

 		this.counter ++;

 		if (KEY_STATUS.left || KEY_STATUS.right ||
			KEY_STATUS.down || KEY_STATUS.up) {
			// The ship moved, so erase it's current image so it can
			// be redrawn in it's new location
			this.ctx.clearRect(this.x, this.y, this.width, this.height);
			
			// Update x and y according to the direction to move and
			// redraw the ship. Change the else if's to if statements
			// to have diagonal movement.
			if (KEY_STATUS.left) {
				this.x -= this.speed
				if (this.x <= 0) // Keep player within the screen
					this.x = 0;

			} else if (KEY_STATUS.right) {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width)
					this.x = this.canvasWidth - this.width;

			} else if (KEY_STATUS.up) {
				this.y -= this.speed
				if (this.y <= this.canvasHeight/4*2)
					this.y = this.canvasHeight/4*2;

			} else if (KEY_STATUS.down) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height)
					this.y = this.canvasHeight - this.height;

			}
		}
		if (KEY_STATUS.space && this.counter >= this.fireRate) {
				
			this.counter = 0;
			// alert(this.counter);
			let bullet = this.fireBullet();

			return true;
		}
 	}

 	// CREATE BULLET AND FIRE
 	fireBullet(){

 		// alert("boom");
 		this.bullets[this.bulletCount] = new Bullet({

 			width 	: 20,
 			height 	: 20,
 			ctx		: this.ctx,
 			x		: this.x,
 			y		: this.y,
 			canvasWidth : this.canvasWidth,
 			canvasHeight : this.canvasHeight
 		});

 		this.bullets[this.bulletCount].loadImages();
 		this.bullets[this.bulletCount].fire();

 		this.bulletCount ++;

 		return true;
 	}

 	// CHECK BULLET AND CALL MOVEBULLET
 	moveBullet(ufos){
		let newArr = [];
		
 		this.bullets.forEach(function(bullet){
 			
 			if (bullet.width <= 0 || bullet.bulletHitUfo(ufos)) {

 				this.bullets.splice(bullet, 1);
 				
 			} else {

   		    	bullet.moveBullet();	
   		    	newArr.push(bullet);
			}

 		}.bind(this));

 		this.bullets = newArr;
 		// console.log(this.bullets.length);
 	}

 	
 	
}