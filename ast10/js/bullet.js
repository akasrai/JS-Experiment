/**
 * BULLET CLASS
 */

 "use strict";

 class Bullet{

 	constructor(props){

 		this.x		= props.x;
 		this.y		= props.y;
 		this.ctx	= props.ctx;
 		this.dx		= props.dx || 0;
 		this.dy		= props.dy || -1;
 		this.speed	= props.speed || 10;
 		this.width	= props.width || 50;
 		this.height	= props.height|| 80;
 		this.canvasWidth	= props.canvasWidth;
 		this.canvasHeight	= props.canvasHeight;

 		this.bulletImage = null;
 		this.bulletImageLoaded = false;

 	}

 	// FIRES THE BULLET
 	fire(){

		// this.ctx.fillStyle = "rgb(255,255,255)";
		// this.ctx.rect(this.x + 50, this.y, this.width, this.height);
		this.ctx.drawImage($bulletImage, this.x + 50, this.y, this.width, this.height);	
		// this.ctx.fill();
		// alert("boom")

 	}

 	// ANIMATE BULLET
 	moveBullet(){

 		this.width -= 0.8;
 		this.height -= 0.8;

 		let center = (this.canvasWidth / 2) ;
 		// let aim  = Math.floor(Math.random() * (center - 590)) + 590;

 		// if(!(this.x > (center - 200) && this.x < (center + 200))){

	 	// 	if( this.x < center){

	 	// 		this.x += 15;
	 	// 	}

	 	// 	if( this.x > center){
	 	// 		this.x -= 15;
	 	// 	}
	 	// }

	 	if (KEY_STATUS.left) {
			
	 		this.x +=15;

		} else if (KEY_STATUS.right) {
			
			this.x -= 15;

		} else if (KEY_STATUS.up) {
			this.y += 8 ;

		} else if (KEY_STATUS.down) {


		}

 		// console.log(this.dx);
 		this.y += this.dy * this.speed; 
 		this.x += this.dx * this.speed; 
 		
 		

		if(this.width > 0 && this.height > 0) {

			this.fire();
		}else{

			return false;
		}	
 	}
}
