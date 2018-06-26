
var $body = document.getElementsByTagName('body')[0];
var $gamepanel = document.createElement('div');
$gamepanel.style.background = "black";
$gamepanel.style.width = "800px";
$gamepanel.style.height = "500px";
$gamepanel.style.position ="relative";
$gamepanel.style.margin = "auto";
$gamepanel.style.border = "15px solid gray";

$body.appendChild($gamepanel);

var $movingBall = document.createElement('div');
$movingBall.className = "ball";
$movingBall.style.position ="absolute";
$movingBall.style.width ="50px";
$movingBall.style.height ="50px";
$movingBall.style.background ="red";
$movingBall.style.borderRadius ="100%";

var $strikingBall = document.createElement('div');
$strikingBall.className = "strikingbal";
$strikingBall.style.position ="absolute";
$strikingBall.style.width ="50px";
$strikingBall.style.height ="50px";
$strikingBall.style.background ="blue";
$strikingBall.style.borderRadius ="100%";


$gamepanel.appendChild($strikingBall);
$gamepanel.appendChild($movingBall);

var speed = 15;
var speed2 = 20;
var direction = [-1,1];

var ball = {
	x:15,
	y:15,
	dx: direction[Math.floor(Math.random() * direction.length)],
	dy: direction[Math.floor(Math.random() * direction.length)],
	$elem  : $movingBall,
	radius : 25
	
};

var ball2 = {
	x:485,
	y:485,
	dx: direction[Math.floor(Math.random() * direction.length)],
	dy: direction[Math.floor(Math.random() * direction.length)],
	$elem  : $strikingBall,
	radius : 25
};

updateBall(ball,ball2);

setInterval(function(){
	ball.x = ball.x + ball.dx * speed;
	ball.y = ball.y + ball.dy * speed;
	
	ball2.x = ball2.x + ball2.dx * speed2;
	ball2.y = ball2.y + ball2.dy * speed2;

	checkBoundryCollision();
	checkCollison(ball, ball2);

	updateBall(ball,ball2);
},100);


function distance(ball1, ball2 ){
	var dx = ball1.x - ball2.x,
        dy = ball1.y - ball2.y;
        return Math.sqrt(dx * dx + dy * dy);
}

function checkCollison(ball1, ball2){

	if( distance(ball1, ball2) <= ball1.radius + ball2.radius ){
		
		
		
		if(ball2.dx === -1 && ball2.dy === -1){
		
			if(ball1.dx === -1 && ball1.dy === -1){
		
				ball1.dx = -1;
				ball1.dy = -1;
				ball2.dx = 1;
				ball2.dy = 1;

			}else if(ball1.dx === 1 && ball1.dy === 1){
		
				ball1.dx = -1;
				ball1.dy = -1;
				ball2.dx = 1;
				ball2.dy = 1;

			}else if(ball1.dx === 1 && ball1.dy === 0){
		
				ball1.dx = -1;
				ball1.dy = -1;
				ball2.dx = -1;
				ball2.dy = 1;

			}else if(ball1.dx === 0 && ball1.dy === 1){
		
				ball1.dx = -1;
				ball1.dy = -1;
				ball2.dx = -1;
				ball2.dy = 1;

			}else if(ball1.dx === -1 && ball1.dy === 1){
		
				ball1.dx = -1;
				ball1.dy = -1;
				ball2.dx = -1;
				ball2.dy = 1;

			}else if(ball1.dx === 1 && ball1.dy === -1){
		
				ball1.dx = -1;
				ball1.dy = -1;
				ball2.dx = -1;
				ball2.dy = 1;

			}else if(ball1.dx === -1 && ball1.dy === 0){
		
				ball1.dx = -1;
				ball1.dy = -1;
				ball2.dx = -1;
				ball2.dy = 1;

			}else if(ball1.dx === 0 && ball1.dy === -1){
		
				ball1.dx = -1;
				ball1.dy = -1;
				ball2.dx = -1;
				ball2.dy = 1;

			}

		}else if(ball2.dx === 1 && ball2.dy === -1){
			
			if(ball1.dx === -1 && ball1.dy === -1){
		
				ball1.dx = 1;
				ball1.dy = -1;
				ball2.dx = -1;
				ball2.dy = -1;

			}else if(ball1.dx === 1 && ball1.dy === 1){
		
				ball1.dx = 1;
				ball1.dy = -1;
				ball2.dx = 1;
				ball2.dy = 1;

			}else if(ball1.dx === 1 && ball1.dy === 0){
		
				ball1.dx = 1;
				ball1.dy = -1;
				ball2.dx = 1;
				ball2.dy = 1;

			}else if(ball1.dx === 0 && ball1.dy === 1){
		
				ball1.dx = 1;
				ball1.dy = -1;
				ball2.dx = 1;
				ball2.dy = 1;

			}else if(ball1.dx === -1 && ball1.dy === 1){
		
				ball1.dx = 1;
				ball1.dy = -1;
				ball2.dx = -1;
				ball2.dy = 1;

			}else if(ball1.dx === 1 && ball1.dy === -1){
		
				ball1.dx = 1;
				ball1.dy = -1;
				ball2.dx = -1;
				ball2.dy = 1;

			}else if(ball1.dx === -1 && ball1.dy === 0){
		
				ball1.dx = 1;
				ball1.dy = -1;
				ball2.dx = 1;
				ball2.dy = 1;

			}else if(ball1.dx === 0 && ball1.dy === -1){
		
				ball1.dx = 1;
				ball1.dy = -1;
				ball2.dx = -1;
				ball2.dy = -1;

			}

		}else if(ball2.dx === 0 && ball2.dy === -1){
			ball2.dx = 0;
			ball2.dy = 1;

		}else if(ball2.dx === -1 && ball2.dy === 1){
			ball2.dx = 1;
			ball2.dy = -1;

		}else if(ball2.dx === 1 && ball2.dy === 1){
			ball2.dx = -1;
			ball2.dy = -1;

		}else if(ball2.dx === 0 && ball2.dy === 1){
			ball2.dx = 0;
			ball2.dy = -1;

		}else if(ball2.dx === 1 && ball2.dy === 0){
			ball1.dx = -1;
			ball1.dy = 0;

		}else if(ball2.dx === -1 && ball2.dy === 0){
			ball2.dx = 1;
			ball2.dy = 0;
		}

		if(ball1.dx === -1 && ball1.dy === -1){
		
			ball1.dx = 1;
			ball1.dy = 1;

		}else if(ball1.dx === 1 && ball1.dy === -1){
			
			ball1.dx = -1;
			ball1.dy = 1;

		}else if(ball1.dx === 0 && ball1.dy === -1){
			ball1.dx = 0;
			ball1.dy = 1;

		}else if(ball1.dx === -1 && ball1.dy === 1){
			ball1.dx = 1;
			ball1.dy = -1;

		}else if(ball1.dx === 1 && ball1.dy === 1){
			ball1.dx = -1;
			ball1.dy = -1;

		}else if(ball1.dx === 0 && ball1.dy === 1){
			ball1.dx = 0;
			ball1.dy = -1;

		}else if(ball1.dx === 1 && ball1.dy === 0){
			ball1.dx = -1;
			ball1.dy = 0;

		}else if(ball1.dx === -1 && ball1.dy === 0){
			ball1.dx = 1;
			ball1.dy = 0;
		}
	}
}

function updateBall(ball, ball2){
	ball.$elem.style.top = ball.y + "px";
	ball.$elem.style.left = ball.x + "px";

	ball2.$elem.style.left = ball2.x + "px";
	ball2.$elem.style.top = ball2.y + "px";
	
}


function checkBoundryCollision(){

	var ballLeft = ball.x;
	var ball2Left = ball2.x;

	var ballRight = ballLeft;
	var ball2Right = ball2Left;

	var ballTop = ball.y;
	var ball2Top = ball2.y;

	var ballBottom = ballTop;
	var ball2Bottom = ball2Top;

	var containerTop = 0;
	var containerLeft = 0;
	var containerRight = 775;
	var containerBottom = 475;
	
	if(ballTop <= containerTop){
		
		return ball.dy = 1;
	}

	if(ballLeft <= containerLeft){
		
		return ball.dx = 1;
	}
	

	if(ballBottom >= containerBottom){
		
		return ball.dy = -1;
	}

	if(ballRight >= containerRight){
		
		return ball.dx = -1;
	}

// second ball	
	if(ball2Top <= containerTop){
		
		return ball2.dy = 1;
	}

	if(ball2Left <= containerLeft){
		
		return ball2.dx = 1;
	}
	

	if(ball2Bottom >= containerBottom){
		
		return ball2.dy = -1;
	}

	if(ball2Right >= containerRight){
		
		return ball2.dx = -1;
	}
}

function smashBall(keyCodeNumber) {
   
    var LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;

    switch (keyCodeNumber) {
    case LEFT:
        ball2.dx = -1;
        ball2.dy = 0;
        break;
    case UP:
        ball2.dx = 0;
       	ball2.dy = -1;
        break;
    case RIGHT:
        ball2.dx = 1;
        ball2.dy = 0;
        break;
    case DOWN:
         ball2.dx = 0;
         ball2.dy = 1;
        break;
    default:
        //alert("default");
        break;
    }

}

function checkKeycode(event) {
    // handling Internet Explorer stupidity with window.event
    // @see http://stackoverflow.com/a/3985882/517705
    var keyDownEvent = event || window.event,
        keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;

    smashBall(keycode);

    return false;
}

document.onkeydown = checkKeycode;