 
 function Shooter(props){

 	this.width	= props.width || 100;
 	this.height	= props.height || 150;
 	this.class  = props.class || "shooter";
 	this.id 	= props.id || "shooter";
 	this.$parent = props.parent;
 	this.background = props.background;
 	this.speed 		= props.speed || 10;
 	this.dx 		= 0;
 	this.dy 		= 0;
 	this.x 			= props.left || 50;
 	this.y 			= props.bottom || 0;
 	this.parentHeight = props.parentHeight;
 	this.parentWidth  = props.parentWidth;

 	// TO STORED THE BULLETS FIRED AND COUNT
 	var firedbullet = [];
 	var bulletcount = 0;

 	var thisShooter = this;

 	// CREATING SHOOTER
 	this.$shooter = document.createElement("div");

 	this.initShooter = function(){

 		thisShooter.$shooter.style.width	= thisShooter.width + "px";
 		thisShooter.$shooter.style.height	= thisShooter.height+ "px";
 		thisShooter.$shooter.className 	= thisShooter.class;
 		thisShooter.$shooter.setAttribute("id", thisShooter.id);
 		thisShooter.$shooter.style.backgroundImage	= "url("+thisShooter.background+")";

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

 		return thisShooter.$parent;
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
	        thisShooter.$shooter.style.backgroundImage	= "url(images/skew_left.gif)";

	        // PLOTTING THE NEW POSITION OF SHOOTER
	        thisShooter.updateNewPosition();
 			plotPosition();
 			var timeoutID = window.setTimeout(changeBackground, 200);	
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
	        thisShooter.$shooter.style.backgroundImage	= "url(images/skew_right.gif)";

	        // PLOTTING THE NEW POSITION OF SHOOTER
	        thisShooter.updateNewPosition();
 			plotPosition();
 			var timeoutID = window.setTimeout(changeBackground, 200);	
	        break;
	    case DOWN:

	    	thisShooter.dy = -1;
	    	thisShooter.dx = 0;

	    	// PLOTTING THE NEW POSITION OF SHOOTER
	    	thisShooter.updateNewPosition();
 			plotPosition();
	        break;

	    case FIRE:

	    	firedbullet[bulletcount] = new Bullet({
	    		id 		: "bullet-" + bulletcount,
	    		parent 	: thisShooter.$shooter,
	    		parentOfParent : thisShooter.$parent,
	    		left 	: 35,
	    		bottom  : thisShooter.y+20,
	    		parentHeight : thisShooter.parentHeight,
	    		parentWidth : thisShooter.parentWidth,
	    		parentX	: thisShooter.x
	    	});

	     	firedbullet[bulletcount].initBullet();
	     	destroyedSound = new GameSound("sound/gun.mp3");
			destroyedSound.play();
	     	bulletcount++;

	    	break;

	    default:
	      
	        break;
	    }
 	}

 	// RETURN THE BULLETS FIRED TO ACCESS FOR OTHER CLASSES
 	this.bulletsFired = function(){

 		// IF BULLET CROSSES THE SCREEN ITS REMOVED FRO THE SCREEN AND ARRAY
 		firedbullet.forEach(function(bullet) {
			
			if( bullet.y <  thisShooter.parentHeight){

	 			// GETTING INDEX TO DELETE
				// var removeIndex = firedbullet.indexOf(bullet);
				
				// DELETING FROM ARRAY
				// firedbullet.splice(removeIndex, 1);

				// if(firedbullet[removeIndex] == undefined ){

				// 	firedbullet = [];
				// }
	 		}
		});
 		//console.log(firedbullet.length);
 		//console.log(firedbullet);
 		return firedbullet;
 	}

 	// DESTROY SHOOTER IF CRASHED
 	this.destroyShooter = function(){

 		thisShooter.$shooter.style.backgroundImage	= "url(images/fire2.gif)";
 		var timeoutID = window.setTimeout(removeShooter, 400);	

 	}

 	// REMOVE DIV OF SHOOTER ONCE ITS DESTROYED
 	var removeShooter = function(){

 		thisShooter.$parent.removeChild(thisShooter.$shooter);
 	}

	// CHANGING BACKGROUND OF SHOOTER
	var changeBackground = function(){

		thisShooter.$shooter.style.backgroundImage	= "url("+thisShooter.background+")";		
	}
 }