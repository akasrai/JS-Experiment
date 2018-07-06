/**
 * UFO class
 **/

 "use strict";

 class Ufo{

 	constructor(props){

 		this.ctx = props.ctx;
 		this.loadedUfos = [];
 		this.isUfoLoaded = false;
 		this.x 	 	= props.x || 100;
 		this.y 		= props.y || 100;
 		this.dx 	= props.dx || 0;
 		this.dy 	= props.dy || -1;
 		this.life 	= props.life || 2;
 		this.type 	= props.type || 1;
 		this.speed 	= props.speed || 2;
 		this.width 	= props.width || 100;
 		this.height = props.height || 100;
 		this.canvasWidth = props.canvasWidth;
 		this.canvasHeight= props.canvasHeight;

 		this.image = null;
 	}

 	// DRAW UFOS
 	drawUfo(){

 		if(this.isUfoLoaded){

 			if(this.dy === 1)
 				this.type = 4;

 			this.ctx.drawImage(this.loadedUfos[this.type], this.x + 50, this.y, this.width, this.height);	
 		}else{

 			// console.log("No images loaded");
 		}
 	}

 	// IMAGES LOADER
 	loadImages() {

	    let images = ["images/fighter2.png", "images/fighter3.png", "images/fighter4.png", "images/fighter5.png","images/ast1.png","images/ast2.png","images/ast3.png",];

	    let loadcount = 0;
	    let loadtotal = images.length;
	    
	    for (var i=0; i<images.length; i++) {
	      	 
	      	this.image = new Image();
	        this.image.onload = function () {
	            loadcount++;
	            if (loadcount == loadtotal) {
	                // Done loading
	                this.isUfoLoaded = true;
	            }
	        }.bind(this);
	
	        this.image.src = images[i];
	 
	        // Save to the image array
	        this.loadedUfos[i] = this.image;
	    }
	 
	    return this.loadedUfos;
 	}

 	// FLY UFOS
 	flyUfos() {

 		this.y -= this.dy * this.speed; 
 		this.x += this.dx * this.speed;
 		this.width += 0.6;
 		this.height += 0.6;

 		this.drawUfo();
 	}
}