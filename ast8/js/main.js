
var $container = document.getElementById("container"),
	$background = document.getElementById("background"),
	gamePanelWidth	= 1000,
	gamePanelHeight	= 600,
	intervalSpeed	= 100,
	bulletid		= 0,
	gamePlaying,
	// IF GAME IS IN PALY OR PAUSE STATE
	play = true,
	// IF SHOOTER IS DESTROYED
	shooterDestroyed = false,
	$panelCreated,
	gamePanel,
	backgroundMusic,
	shooter;

	

function startGame(){

	// CREATES GAME PANEL DIV
	gamePanel = new GamePanel({

		width 	: gamePanelWidth,
		height 	: gamePanelHeight,
		parent 	: $container,
		class	: "gamepanel",
		id 		: "gamepanel",
		background: "",
		backgroundParent : $background

	});

	$panelCreated = gamePanel.initGamePanel();
	// SCROLL BG INFINITY
	// gamePanel.infinityBackground();
	gamePanel.welComePanel();
	
	// RETURN DOM ELEMENT AFTER ADDING BUTONS
	var $elem = gamePanel.addButtoms();
	gamePanel.buttonName("YES, LETS FIGHT");
	
	$elem.addEventListener("click", function(){ setLevel(gamePanel);});
}


function setLevel(resetPanel){

	gamePanel.infinityBackground();
	// RESETTING THE GAMEPANEL TO PLAY GAME USING gamePanel OBJECT OF GamePanel
	resetPanel.resetGamePanel();

	// ADDING CONTROL PANEL ON THE TOP
	var $controlpanel = gamePanel.addControlPanel();

	// ADD PAUSE BUTTON // SCORE PANEL
	var $pause 		= gamePanel.pauseButton();
	var $scorepanel = gamePanel.scorePanel();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CREATING LEVEL THAT CREATES UFO AS PER LEVEL
	var level1 = new GameLevel({

		level 	: 1,
		ufos 	: 50,
		parent 	: $panelCreated,
		speed 	: 5,
		ufoLife : 1,
		point 	: 2

	});

	var level = new GameLevel({

		level 	: 2,
		ufos 	: 100,
		parent 	: $panelCreated,
		speed 	: 10,
		ufoLife : 2,
		point 	: 3

	});

	var shooter = level.createShooter();
	var ufos 	= level.createUfos();
	var scoreCounter = level.scorePanelInitialise($scorepanel);
					   level.gameScore();		  

	backgroundMusic = new GameSound("sound/bg.mp3");
	backgroundMusic.play();

	$pause.onclick = function(){

		if(!shooterDestroyed){
			if(play){
	
				play = false;
				clearInterval(gamePlaying);
				gamePanel.changePauseIcon("images/play.png");
				gamePanel.pauseInfinityBg();
				backgroundMusic.stop();
	
			}else{
	
				play = true;
				playGame(level, shooter);
				gamePanel.changePauseIcon("images/pause.png");
				gamePanel.infinityBackground();
				backgroundMusic.play();
			}
		}
	}

	playGame(level, shooter);
}

function playGame(level, shooter){

	// SETTING INTERVAL FOR GAME
	gamePlaying = setInterval(function(){

		// CHECK SHOTTERS ALL COLLIION
		shooterDestroyed = level.checkCollision(shooter);

		// FLIES THE UFO 
		level.flyUfo();

		shooter.fireBullet();

		document.onkeydown = function(){
	
			var keyDownEvent 	= event || window.event,
	       		keyPressedCode 	= (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
			
			if(play === true && shooterDestroyed === false){

				shooter.checKeyPressed(keyPressedCode);	
			}
		}

		if(shooterDestroyed){

			clearInterval(gamePlaying);
			gamePanel.pauseInfinityBg();
			gamePanel.changePauseIcon("images/stop.png");
			backgroundMusic.stop();
			gameOver(level);

		}
	
	},intervalSpeed);
}

startGame();


function gameOver(level){

	var gameover = new GamePanel({

		width : 500,
		height : "auto",
		class : "game-over-panel",
		id : "gameover",
		background : "rgba(132, 5, 5, 0.52)",
		parent : $container
	});



	gameover.initGamePanel();
	gameover.gameOverMessage();
	var $restart = gameover.addButtoms();
				gameover.buttonName("CHALLENGE AGAIN?");

	var $exit = gameover.exitButton();

	$restart.onclick = function(){

		level.destroyAllUfosAndBullet();

		setLevel(gameover);
	}

	$exit.onclick = function(){

		level.destroyAllUfosAndBullet();
		gameover.removePanel();
		gamePanel.removePanel();
		gamePanel.removeControlPanel();

		startGame();

	}

}