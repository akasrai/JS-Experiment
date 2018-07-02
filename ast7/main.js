
// var $container 		= document.getElementById("container");
var containerWidth 	= 1000;
var containerHeight	= 500;
var classname		= "gamepanel";
var ballWidth		= 30;
var ballHeight		= 30;
var score			= 0;
var numberOfBalls	= 20;

function createContainer(){

	var container = new Container({

		width : containerWidth,
		height: containerHeight,
		classname : classname,
		id 		  : classname
	});

	var $container = container.initContainer();

	return $container;
	
}

// CREATING ARRAY OF OBJECTS
var balls = [];

function createBalls(num, $container){

	var x = "x",
		y = "y";
	for( var i = 0; i < num; i++){

		balls[i] = new Ball({
		
			width		: ballWidth,
			height		: ballHeight,
			x			: Math.floor(Math.random() * (containerWidth - ballWidth)), //( i === 0) ?  Math.floor(Math.random() * 980) : balls[i].uniqueBallPosition(i, x),
			y			: Math.floor(Math.random() * (containerHeight - ballHeight)), //( i === 0) ?  Math.floor(Math.random() * 480) : balls[i].uniqueBallPosition(i, y),
			$parent		: $container,
			containerH  : containerHeight - ballHeight,
			containerW	: containerWidth -  ballWidth,
			speed	 	: Math.floor(Math.random() * 5)+1,
			collision 	: 0,
			ballid 		: i+1,
			backgroundImage : ""
		});

		// balls[i].x = balls[i].uniqueBallPosition(i, x);
		// balls[i].y = balls[i].uniqueBallPosition(i, y);
		balls[i].initBalls();
	}

}

function startGame(){
	var container = createContainer();
	//alert($container);
	createBalls(numberOfBalls, container);

	var gamePlaying = setInterval(function() {
		for(var i = 0; i <balls.length; i++){

			balls[i].updateBallPosition();
			balls[i].bounceBall();
			balls[i].checkBoundryCollision();
			balls[i].checkInterCollision();
			balls[i].ballDestroy();
		}
		if(balls.length === 0){
			
			clearInterval(numberOfBalls);

			var score = new Container({
				width : 50,
				height: 50,
				classname : "score-board",
				id 		  : "scoreboard"
			});

			score.gameScoreBoard();
		}

	}, 50);
	
	
	// backgroundMusic = new GameSound("sound/bgmusic.ogg");
	// backgroundMusic.play();
}
startGame();