
var $container = document.getElementById("container"),
	gamePanelWidth	= 1000,
	gamePanelHeight	= 600,
	intervalSpeed	= 100,
	bulletid		= 0;
	

function createGamePanel(){

	var gamePanel = new GamePanel({

		width 	: gamePanelWidth,
		height 	: gamePanelHeight,
		parent 	: $container,
		class	: "gamepanel",
		id 		: "gamepanel"
	});

	var $panelCreated = gamePanel.initGamePanel();

	createShooter($panelCreated);
}

function createShooter($panelCreated){

	

	// CREATING LEVEL THAT CREATES UFO AS PER LEVEL
	var level = new GameLevel({

		level 	: 1,
		ufos 	: 10,
		parent 	: $panelCreated,
		speed 	: 2,
		ufoLife : 2
	});
	
	var shooter = level.createShooter();
	var ufos 	= level.createUfos();

	// SETTING INTERVAL FOR GAME
	var gamePlaying = setInterval(function(){

		level.checkCollision(shooter);

		level.flyUfo();

		document.onkeydown = function(){

			var keyDownEvent 	= event || window.event,
        		keyPressedCode 	= (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;

			shooter.checKeyPressed(keyPressedCode);	
		}
	
	},intervalSpeed);
}

createGamePanel();