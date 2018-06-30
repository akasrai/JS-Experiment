
function FlyingUFO(props){

	this.width	= props.width || 30;
 	this.height	= props.height || 30;
 	this.class  = props.class || "ufo";
 	this.id 	= props.id || "ufo";
 	this.$parent = props.parent;
 	this.background = props.background || "yellow";
 	this.speed 		= props.speed || 15;
 	this.dx 		= 1;
 	this.dy 		= 1;
 	this.x 			= props.left;
 	this.y 			= props.top;
 	
 	var thisUfo = this;

 	// CREATING DIV FOR UFOS
 	this.$ufo = document.createElement("div");

 	this.initUfo = function(){

 		thisUfo.$ufo.style.width	= thisUfo.width + "px";
 		thisUfo.$ufo.style.height	= thisUfo.height + "px";
 		thisUfo.$ufo.style.background	= thisUfo.background;
 		thisUfo.$ufo.setAttribute("id",thisUfo.id);
 		thisUfo.$ufo.className = thisUfo.class;

 		thisUfo.$parent.appendChild(thisUfo.$ufo);

 		return thisUfo.$ufo;
 	}

 	// UPDATING THE POSITION
 	var updatePositionOfUFO = function(){

 		thisUfo.$ufo.style.left = thisUfo.x;
 		thisUfo.$ufo.style.top 	= thisUfo.y;
 	}
 	
 	// FLY UFO
 	this.flyUfo = function(){

 		thisUfo.x += thisUfo.dx * speed;
 		thisUfo.y += thisUfo.dy * speed;

 	}
}