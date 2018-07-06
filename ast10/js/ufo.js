/**
 * UFO class
 **/

 "use strict";

 class Ufo{

 	constructor(props){

 		this.x 	 	= props.x || 100;
 		this.y 		= props.y || 100;
 		this.dx 	= props.dx || 0;
 		this.dy 	= props.dy || -1;
 		this.life 	= props.life || 2;
 		this.type 	= props.type || 1;
 		this.speed 	= props.speed || 10;
 		this.width 	= props.width || 100;
 		this.height = props.height || 100;

 	}

 	// DRAW UFOS
 	drawUfo(ctx){

 		// alert("hello");
 	}
 }