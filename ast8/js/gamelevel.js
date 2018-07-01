
function GameLevel(props){

	this.level 	 = props.level;
	this.ufos 	 = props.ufos;
	this.speed 	 = props.speed;
	this.$parent  = props.parent;
	this.ufoLife  = props.ufoLife;
	 
	// STORES THE UFOS CREATED DATA
	var ufoCreated = [];

	// TO STORE BULLETS FIRED BY SHOOTER
	var bulletsFired = [];

	// TO CREATE OBJECT OF GAME LEVEL
	var shooter;

	var thisGame = this;

	this.createShooter = function(){

		// CREATINF SHOOTER
		shooter = new Shooter({
		
			width 	: 100,
			height 	: 120,
			parent 	: thisGame.$parent,
			class 	: "shooter",
			id 		: "shooter",
			background : "images/still.gif",
			left 	   : (gamePanelWidth / 8) * 4 - 62,
			parentHeight : gamePanelHeight,
			parentWidth  : gamePanelWidth

		});

		var shooterCreated = shooter.initShooter();
		return shooter;
	}

	// CREATING UFOS USING FlyingUFO CLASS
	this.createUfos = function(){

		var ufoRow = 0;
		var ufoHeight = gamePanelHeight;
		
		for(var i = 0; i < thisGame.ufos; i++){

			ufoCreated[i] = new FlyingUFO({

				width 		: 120,
				height 		: 100,
				id 			: "ufo-" + i,
				left		: Math.floor(Math.random() * gamePanelWidth ),
				bottom 		: ufoHeight,
				parent 		: thisGame.$parent,
				speed 		: thisGame.speed,
				background	: "images/v6.png"

			});

			ufoCreated[i].left = ufoCreated[i].getUniquePosition(ufoCreated, "x");
			// ufoCreated[i].top = ufoCreated[i].getUniquePosition(ufoCreated, "y");

			ufoCreated[i].initUfo();

			if(ufoRow < 3){
				ufoHeight = ufoHeight;
				ufoRow ++;
			}else{
				ufoRow = 0;
				ufoHeight += 200;
			}
		}
		
	}

	// FLY THE UFOS CREATED BY INVOKING THE FUNCTION FROM FLYING UFO USING ITS OBJ
	this.flyUfo = function(){

		for(var i = 0; i < thisGame.ufos; i++){

			// CHECKING IS UFO IS DESTROYED ALREADY 
			if(typeof ufoCreated[i] !== "undefined"){
				ufoCreated[i].ufosInMotion();
			}
		}

	}

	// THIS FUNCTION RECEIVES SHOOTER OBJECT AS PARAMETER AND CALL SHOOTER'S FUNCTION USING THAT OBJECT
	this.checkCollision = function(shooter){

		// CHECKING THE BOUNDRY COLLISION OF SHOOTER AND WALL AND GETS ITS X POS
		shooterX = shooter.checkWallCollision();

		// CHECK IF UFO HITS SHOOTER
		checkUfoHitShooter();

		// GET THE BULLETS FIRED DATA
		bulletsFired = shooter.bulletsFired();

		// CHECKING IF BULLET HITS UFOS
		bulletHitUfo();

	}

	// CHECKING IF THE BULLETS HITS THE UFOS
	var bulletHitUfo = function(){

		
		//console.log(bulletsFired.length);
		for(var i = 0; i < bulletsFired.length; i++){

			for(var j = 0; j < ufoCreated.length; j++ ){

				if(bulletsFired[i].y < gamePanelHeight){

				    var bulletY = bulletsFired[i].y + bulletsFired[i].height,
				    	ufoY	= ufoCreated[j].y + ufoCreated[j].height,
				    	bulletX = Math.abs((bulletsFired[i].x + bulletsFired[i].parentX) - ufoCreated[j].x),
				    	bulletW = Math.abs(bulletsFired[i].width + 50);

					
				   	// DESTROY THE BULLETS AND UFO IF BULLET HITS UFO
				   	if( (bulletY > ufoCreated[j].y) && (bulletX < bulletW ) /*&& (bulletY < ufoY)*/) {

				   		if(ufoCreated[j].crashed > thisGame.ufoLife){

				   			bulletsFired[i].destroyBullet();
							ufoCreated[j].destroyUfo(ufoCreated);

				   		}else{

				   			ufoCreated[j].crashed += 1;
				   		}					  		
					}
				}

				// DESTROY THE UFO IF IT CROSSES THE BOTTOM SCREEN
				if(( typeof ufoCreated[j] !== "undefined") && (ufoCreated[j].y <= -100)){

					ufoCreated[j].destroyUfo(ufoCreated);
				}
			}
		}
	}

	// CHECK IF UFO HIT SHOOTER
	var checkUfoHitShooter = function(){

		for(var i = 0; i < ufoCreated.length; i++){

			var crashX = Math.abs( ufoCreated[i].x - shooter.x),
				crashY = Math.abs(ufoCreated[i].y - shooter.y),
				crashWidth = (ufoCreated[i].width + shooter.width) / 2,
				crashHeight = (ufoCreated[i].height + shooter.height) / 2;

			if(crashX <= crashWidth && crashY < crashHeight){
				
				ufoCreated[i].destroyUfo(ufoCreated);
				shooter.destroyShooter();
			}
		}	
	}
}