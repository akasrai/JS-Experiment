'use strict';

////////////////////////////- GLOBAL CONST AND VARIABLES -//////////////////////////////
const $container = document.getElementById("container");

let panelWidth = 700,
	panelHeight = 550,
	animationId,
	gamePanel,
	bird,
	play = 0,
	obstaclesInterval = 0,
	$bgPanel;


///////////////////////////////////- PANEL CREATION -/////////////////////////////////

const createPanel = () =>{

	//////////////////////////// - GAME PANEL CREATION - /////////////////////////
	let createBgPanel = new GamePanel({

		width		: panelWidth,
		height		: panelHeight,
		background 	: "images/background-day.png",
		parent		: $container,
		class		: "bg-panel",
		id 			: "bgpanel"
	});


	$bgPanel = createBgPanel.initPanel();

///////////////////////////- GAME PANEL BG FRO ANIMATION -/////////////////////////////////
	gamePanel = new GamePanel({

		width		: panelWidth,
		height		: panelHeight,
		background 	: "images/base.png",
		parent		: $bgPanel,
		class		: "game-panel",
		id 			: "gamepanel"
	});

	gamePanel.initPanel();

///////////////////////////- CREATING BIRD OBJECT -///////////////////////////////////
	
	bird = new FlappyBird({

		width		: 45,
		height		: 35,
		background 	: "images/flappy.gif",
		parent		: $bgPanel,
		class		: "bird-design",
		id 			: "bird",
		left		: 200,
		top			: 200
	});

	bird.initBird();
	
}

/////////////////////////////- INVOKING MAIN GAME PANEL AND LOOP -/////////////////////////////

let game = new Game();
createPanel();

/////////////////////////////////- MAIN ANIMATION LOOP -//////////////////////////////////////

function animateGame(){
 
	gamePanel.animateBg();
	bird.birdFlyBird();
	bird.birdBoundryCollision();

	// CREATING OBSTACLES IN CERTAIN TIME INTERVAL
	if(obstaclesInterval > 35){

		game.createObstcles();
		obstaclesInterval = 0;
	}

	game.moveObstacles();
	play = game.checkObstacleCollision(bird);
	

	// INVOKING THE SAME FUNCTON FOR REPEATED ANIMATION
  	animationId = requestAnimationFrame(animateGame);

  	if(play === 0 && bird.top  >= ( panelHeight - 150 )){

		cancelAnimationFrame(animationId);
	}

  	obstaclesInterval++;
}


/////////////////////////- CHECKING KEYDOWN EVENT -///////////////////////////////

document.onkeydown = function(){

	var keyDownEvent 	= event || window.event,
   		keyPressedCode 	= (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
	
	if(play === 1 && bird.life === 1){

		bird.flyBirdUpwards(keyPressedCode);
	}

	if(keyPressedCode === 32 && play === 0){

		animateGame();
		let backgroundMusic = new GameSound("sound/bgmusic.ogg");
		backgroundMusic.play();
		play = 1;
	}
}