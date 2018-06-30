 
 function Shooter(props){

 	this.width	= props.width || 100;
 	this.height	= props.height || 150;
 	this.class  = props.class || "shooter";
 	this.id 	= props.id || "shooter";
 	this.$parent = props.parent;
 	this.background = props.background;
 	this.speed 		= props.speed || 30;
 	this.dx 		= 0;
 	this.dy 		= 0;
 	this.x 			= props.left || 50;
 	this.y 			= props.bottom || 0;
 	this.parentHeight = props.parentHeight;
 	this.parentWidth  = props.parentWidth;

 	var thisShooter = this;

 	// CREATING SHOOTER
 	this.$shooter = document.createElement("div");

 	this.initShooter = function(){

 		thisShooter.$shooter.style.width	= thisShooter.width + "px";
 		thisShooter.$shooter.style.height	= thisShooter.height+ "px";
 		thisShooter.$shooter.className 	= thisShooter.class;
 		thisShooter.$shooter.setAttribute("id", thisShooter.id);
 		thisShooter.$shooter.style.background	= thisShooter.background;

 		// PLOTTING THE POSITION FROM PRIVATE FUNCTION
 		plotPosition();

 		thisShooter.$parent.appendChild(thisShooter.$shooter);

 		return thisShooter.$shooter;
 	}

 	var plotPosition = function(){

 		thisShooter.$shooter.style.left	= thisShooter.x  + "px" ;
 		thisShooter.$shooter.style.bottom	= thisShooter.y  + "px" ;
    
 	}

 	// NEW POSITION OF BALL IS UPDATED
 	this.updateNewPosition = function(){

 		thisShooter.x += thisShooter.dx * thisShooter.speed;
 		thisShooter.y += thisShooter.dy * thisShooter.speed;

 	}

 	// CHECKING WALL COLLISION
 	this.checkWallCollision = function(){

 		if((thisShooter.x + thisShooter.width) >= thisShooter.parentWidth || thisShooter.x <= 0){

 			(thisShooter.x <= 0) ? thisShooter.x = 0 : thisShooter.x = thisShooter.parentWidth - thisShooter.width; 
 			thisShooter.dx = -(thisShooter.dx);
 		} 

 		if((thisShooter.y + thisShooter.height) >= thisShooter.parentHeight || thisShooter.y <= 0){

 			(thisShooter.y <= 0) ? thisShooter.y = 0 : thisShooter.y = thisShooter.parentHeight - thisShooter.height; 
 			thisShooter.dy = -(thisShooter.dy);
 		} 
 	}

 	// CHECKING KEY PRESSED TO MOVE LEFT AND RIGHT
 	this.checKeyPressed = function(keyCode){

 		var LEFT 	= 37,
	        UP 		= 38,
	        RIGHT	= 39,
	        DOWN	= 40,
	        FIRE 	= 32;

	    switch (keyCode) {
	    case LEFT:

	        thisShooter.dx = -1;
	        thisShooter.dy = 0;

	        // PLOTTING THE NEW POSITION OF SHOOTER
	        thisShooter.updateNewPosition();
 			plotPosition();
	        break;

	    case UP:

	       	thisShooter.dy = 1;
	       	thisShooter.dx = 0;

	       	// PLOTTING THE NEW POSITION OF SHOOTER
	       	thisShooter.updateNewPosition();
 			plotPosition();
	        break;

	    case RIGHT:

	        thisShooter.dx = 1;
	        thisShooter.dy = 0;

	        // PLOTTING THE NEW POSITION OF SHOOTER
	        thisShooter.updateNewPosition();
 			plotPosition();
	        break;
	    case DOWN:

	    	thisShooter.dy = -1;
	    	thisShooter.dx = 0;

	    	// PLOTTING THE NEW POSITION OF SHOOTER
	    	thisShooter.updateNewPosition();
 			plotPosition();
	        break;

	    case FIRE:

	    	var fireBullet = new Bullet({
	    		id 		: "bullet-" + bulletid,
	    		parent 	: thisShooter.$shooter,
	    		parentOfParent : thisShooter.$parent,
	    		left 	: 35,
	    		bottom  : thisShooter.y,
	    		parentHeight : thisShooter.parentHeight,
	    		parentWidth : thisShooter.parentWidth,
	    		parentX	: thisShooter.x
	    	});

	    	fireBullet.initBullet();
	    	bulletid++;
	    	break;

	    default:
	      
	        break;
	    }
 	}
 }