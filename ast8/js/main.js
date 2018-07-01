
var $container = document.getElementById("container"),
	$background = document.getElementById("background"),
	gamePanelWidth	= 1000,
	gamePanelHeight	= 600,
	intervalSpeed	= 100,
	bulletid		= 0,
	gamePlaying,
	// IF GAME IS IN PALY OR PAUSE STATE
	play = true;

	

function startGame(){

	// CREATES GAME PANEL DIV
	var gamePanel = new GamePanel({

		width 	: gamePanelWidth,
		height 	: gamePanelHeight,
		parent 	: $container,
		class	: "gamepanel",
		id 		: "gamepanel",
		background: "",
		backgroundParent : $background

	});

	var $panelCreated = gamePanel.initGamePanel();
	// SCROLL BG INFINITY
	gamePanel.infinityBackground();
	gamePanel.welComePanel();
	
	// RETURN DOM ELEMENT AFTER ADDING BUTONS
	var $elem = gamePanel.addButtoms();
	
	$elem.addEventListener("click", function(){ setLevel($panelCreated, gamePanel);});
}


function setLevel($panelCreated, gamePanel){

	// RESETTING THE GAMEPANEL TO PLAY GAME USING gamePanel OBJECT OF GamePanel
	gamePanel.resetGamePanel();

	// ADDING CONTROL PANEL ON THE TOP
	var $controlpanel = gamePanel.addControlPanel();

	// AD PAUSE BUTTON
	var $pause = gamePanel.pauseButton();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CREATING LEVEL THAT CREATES UFO AS PER LEVEL
	var level = new GameLevel({

		level 	: 1,
		ufos 	: 50,
		parent 	: $panelCreated,
		speed 	: 5,
		ufoLife : 2
	});
	
	var shooter = level.createShooter();
	var ufos 	= level.createUfos();

	backgroundMusic = new GameSound("sound/bg.mp3");
	backgroundMusic.play();

	$pause.onclick = function(){

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

	playGame(level, shooter);
}

function playGame(level, shooter){
	// SETTING INTERVAL FOR GAME
	gamePlaying = setInterval(function(){

		// CHECK SHOTTERS ALL COLLIION
		level.checkCollision(shooter);

		// FLIES THE UFO 
		level.flyUfo();

		document.onkeydown = function(){
	
			var keyDownEvent 	= event || window.event,
	       		keyPressedCode 	= (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
			
			if(play){
				shooter.checKeyPressed(keyPressedCode);	
			}
		}
	
	},intervalSpeed);
}

startGame();