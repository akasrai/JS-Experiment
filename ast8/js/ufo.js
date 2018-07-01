
function FlyingUFO(props){

	this.width	= props.width || 30;
 	this.height	= props.height || 30;
 	this.class  = props.class || "ufo";
 	this.id 	= props.id || "ufo";
 	this.$parent = props.parent;
 	this.background = props.background || "yellow";
 	this.speed 		= props.speed || 60;
 	this.dx 		= props.dx;
 	this.dy 		= -1;
 	this.x 			= props.left;
 	this.y 			= props.bottom;
 	this.panelWidth = props.panelWidth;
 	this.panelHeight= props.panelHeight;
 	this.crashed 	= 0;

 	var thisUfo = this;

 	// CREATING DIV FOR UFOS
 	this.$ufo = document.createElement("div");

 	this.initUfo = function(){

 		thisUfo.$ufo.style.width	= thisUfo.width + "px";
 		thisUfo.$ufo.style.height	= thisUfo.height + "px";
 		thisUfo.$ufo.style.backgroundImage	= "url("+thisUfo.background+")";
 		thisUfo.$ufo.setAttribute("id",thisUfo.id);
 		thisUfo.$ufo.className = thisUfo.class;

 		updatePositionOfUFO();

 		thisUfo.$parent.appendChild(thisUfo.$ufo);

 		return thisUfo.$ufo;
 	}

 	// UPDATING THE POSITION
 	var updatePositionOfUFO = function(){

 		thisUfo.$ufo.style.left = thisUfo.x + "px";
 		thisUfo.$ufo.style.bottom 	= thisUfo.y + "px";
 	}
 	
 	// FLY UFO
 	this.ufosInMotion = function(){

 		thisUfo.x += thisUfo.dx * thisUfo.speed;
 		thisUfo.y += thisUfo.dy * thisUfo.speed;

 		updatePositionOfUFO();

 	}


 	// GETTING UNIQUE POSITION FOR UFOS
 	this.getUniquePosition = function(ufos, pos){
	
		var newXPos = Math.floor(Math.random() * gamePanelWidth);
		// var newYPos = Math.floor(Math.random() * gamePanelWidth);
		
		for(var i = 0; i < ufos.length; i++){

			while(i < ufos.length){

				if((Math.abs( ufos[i].x - newXPos)) < thisUfo.width/* ) && (Math.abs( ufos[i].y - newYPos)) < thisUfo.height*/){
					
					newXPos =  Math.floor(Math.random() * (gamePanelWidth - thisUfo.width) );
					// newYPos =  - Math.floor(Math.random() * gamePanelWidth );
					
				}else{					
					break;
				}
			}
		}

		// if(pos === "x"){
		// 	return newXPos;

		// }else{
			return newXPos;
		// }

	}

	// DESTROY UFOS AFTER CRASH
	this.destroyUfo = function(ufoCreated){

		thisUfo.$ufo.style.backgroundImage	= "url(images/fire2.gif)";
		
		var timeoutID = window.setTimeout(removeUfo, 200);

		// GETTING INDEX TO DELETE
		var removeIndex = ufoCreated.indexOf(thisUfo);
			
		// DELETING FROM ARRAY
		ufoCreated.splice(removeIndex, 1);

		// console.log(ufoCreated.length);
	
	}

	// DESTROY OBJ AFTER SOMETIME USING SETTIMEOUT
	var removeUfo = function(){

		thisUfo.$parent.removeChild(thisUfo.$ufo);

	}

	// UFOS WALL COLLISION
	this.ufoWallCollision = function(){

		if((thisUfo.x + thisUfo.width) >= gamePanelWidth || thisUfo.x <= 0){
 
 			thisUfo.dx = -(thisUfo.dx);
 		} 
	}

	// DESTROY ALL UFO CREATED
	this.destroyAllUfo = function(){
		
		thisUfo.$parent.removeChild(thisUfo.$ufo);
	}
}