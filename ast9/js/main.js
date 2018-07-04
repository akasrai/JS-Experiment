'use strict';

////////////////////////////- GLOBAL CONST AND VARIABLES -//////////////////////////////
const $container = document.getElementById("container");

let panelWidth = 700,
	panelHeight = 550,
	animationId = null,
	gamePanel,
	bird,
	play = 0,
	obstaclesInterval = 0,
	$bgPanel,
	createBgPanel,
	restart = 0,
	backgroundMusic;


///////////////////////////////////- PANEL CREATION -/////////////////////////////////

const createPanel = () =>{

	//////////////////////////// - GAME PANEL CREATION - /////////////////////////
	createBgPanel = new GamePanel({

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
	gamePanel.addGamePanelText();
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
 
	// INVOKING THE SAME FUNCTON FOR REPEATED ANIMATION
  	// if(!(play=== 0)){
  	if(!(play=== 0 && bird.top  >= ( panelHeight - 150 ))){

  		animationId = requestAnimationFrame(animateGame);
  		
	}else{

		restart = gamePanel.gameOverText();
		backgroundMusic = new GameSound("sound/bgmusic.ogg");
		backgroundMusic.stop();
	}

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
	
  	obstaclesInterval++;
}


/////////////////////////- CHECKING KEYDOWN EVENT -///////////////////////////////

document.onkeydown = function(){

	var keyDownEvent 	= event || window.event,
   		keyPressedCode 	= (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
	
	if(play === 1 && bird.life === 1){

		bird.flyBirdUpwards(keyPressedCode);
	}

	if(keyPressedCode == 32 && play == 0){
		
		backgroundMusic = new GameSound("sound/bgmusic.ogg");
		backgroundMusic.play();

		if(restart === 1){

			bird.resetBird();
			game.resetObstacles();
			gamePanel.removeGamePanelText();
			gamePanel.resetPanel();
			gamePanel.initPanel();
			
			bird.top = 200;
			bird.dy  = -1;
			bird.timeCount = 6;
			bird.life = 1;
			bird.initBird();	
			
			restart = 0;
		}

		gamePanel.removeGamePanelText();
		play = 1;
		animateGame();
	}
}