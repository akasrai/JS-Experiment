
var $container = document.getElementById("container"),
	gamePanelWidth	= 1000,
	gamePanelHeight	= 600,
	intervalSpeed	= 10,
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

	var shooter = new Shooter({
	
		width 	: (gamePanelWidth / 8) - 30,
		height 	: 100,
		parent 	: $panelCreated,
		class 	: "shooter",
		id 		: "shooter",
		background : "green",
		left 	   : (gamePanelWidth / 8) * 4 - 62,
		parentHeight : gamePanelHeight,
		parentWidth  : gamePanelWidth

	});

	var shooterCreated = shooter.initShooter();

	var gamePlaying = setInterval(function(){

		//shooter.updateNewPosition();
		shooter.checkWallCollision();

		document.onkeydown = function(){

			var keyDownEvent 	= event || window.event,
        		keyPressedCode 	= (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;

			shooter.checKeyPressed(keyPressedCode);	
		}
				
		
	},intervalSpeed);
}


function checkKeycode(event) {

    // EVENT HANDLING 
    var keyDownEvent 	= event || window.event,
        keyPressedCode 	= (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
        alert(keyPressedCode);
    //return false;
}

 checkKeycode;

createGamePanel();