
var $body = document.getElementsByTagName('body')[0];
var $gamepanel = document.createElement('div');
$gamepanel.style.background = "lightgray";
$gamepanel.style.width = "845px";
$gamepanel.style.height = "545px";
$gamepanel.style.position ="relative";
$gamepanel.style.margin = "auto";
// $gamepanel.style.border = "15px solid gray";

$body.appendChild($gamepanel);

var $movingBall = document.createElement('div');
$movingBall.className = "ball";
$movingBall.style.position ="absolute";
$movingBall.style.width ="30px";
$movingBall.style.height ="30px";
$movingBall.style.background ="red";
$movingBall.style.borderRadius ="100%";

var $strikingBall = document.createElement('div');
$strikingBall.className = "strikingbal";
$strikingBall.style.position ="absolute";
$strikingBall.style.width ="30px";
$strikingBall.style.height ="30px";
$strikingBall.style.background ="blue";
$strikingBall.style.borderRadius ="100%";


$gamepanel.appendChild($strikingBall);
$gamepanel.appendChild($movingBall);


//var direction = [-1,1];

var ball = {
	x:15,
	y:15,
	// dx: direction[Math.floor(Math.random() * direction.length)],
	// dy: direction[Math.floor(Math.random() * direction.length)],
	$elem  : $movingBall,
	radius : 15,
	mass:1,
	xspeed : Math.round(Math.random()*5)+10,
	yspeed : Math.round(Math.random()*5)+10
};

var ball2 = {
	x:485,
	y:485,
	// dx: direction[Math.floor(Math.random() * direction.length)],
	// dy: direction[Math.floor(Math.random() * direction.length)],
	$elem  : $strikingBall,
	radius : 15,
	mass:1,
	xspeed : Math.round(Math.random()*5)+10,
	yspeed : Math.round(Math.random()*5)+10

};

updateBall(ball,ball2);

setInterval(function(){
	ball.x += ball.xspeed;
	ball.y += ball.yspeed;
	
	ball2.x += ball2.xspeed;
	ball2.y += ball2.yspeed;

	updateBall(ball,ball2);
	checkBoundryCollision();
	checkCollison(ball, ball2);
},100);


function distance(ball1, ball2 ){
	var dx = ball1.x - ball2.x,
        dy = ball1.y - ball2.y;
        return Math.sqrt(dx * dx + dy * dy);
}

function checkCollison(ball1, ball2){

	if( distance(ball1, ball2) <= ball1.radius + ball2.radius ){
		
		var diff = (ball1.radius + ball2.radius) -  distance(ball1, ball2);
		
		ball1.x += (15-diff);
		ball1.y += (15-diff);
		ball2.x += (15-diff);
		ball2.y += (15-diff);

		dx = ball1.x-ball2.x;
	    dy = ball1.y-ball2.y;

	    collisionision_angle = Math.atan2(dy, dx);
	    magnitude_1 = Math.sqrt(ball.xspeed*ball.xspeed+ball.yspeed*ball.yspeed);
	    magnitude_2 = Math.sqrt(ball2.xspeed*ball2.xspeed+ball2.yspeed*ball2.yspeed);
	    direction_1 = Math.atan2(ball.yspeed, ball.xspeed);
	    direction_2 = Math.atan2(ball2.yspeed, ball2.xspeed);
	    new_xspeed_1 = magnitude_1*Math.cos(direction_1-collisionision_angle);
	    new_yspeed_1 = magnitude_1*Math.sin(direction_1-collisionision_angle);
	    new_xspeed_2 = magnitude_2*Math.cos(direction_2-collisionision_angle);
	    new_yspeed_2 = magnitude_2*Math.sin(direction_2-collisionision_angle);
	    final_xspeed_1 = ((ball.mass-ball2.mass)*new_xspeed_1+(ball2.mass+ball2.mass)*new_xspeed_2)/(ball.mass+ball2.mass);
	    final_xspeed_2 = ((ball.mass+ball.mass)*new_xspeed_1+(ball2.mass-ball.mass)*new_xspeed_2)/(ball.mass+ball2.mass);
	    final_yspeed_1 = new_yspeed_1;
	    final_yspeed_2 = new_yspeed_2;
	    ball1.xspeed = Math.cos(collisionision_angle)*final_xspeed_1+Math.cos(collisionision_angle+Math.PI/2)*final_xspeed_1;
	    ball1.yspeed = Math.sin(collisionision_angle)*final_yspeed_1+Math.sin(collisionision_angle+Math.PI/2)*final_yspeed_1;

	    ball2.xspeed = Math.cos(collisionision_angle)*final_xspeed_2+Math.cos(collisionision_angle+Math.PI/2)*final_xspeed_2;
    	ball2.yspeed = Math.sin(collisionision_angle)*final_yspeed_2+Math.sin(collisionision_angle+Math.PI/2)*final_yspeed_2;
	    
	    // console.log(ball1.xspeed);
		// console.log(ball1.yspeed);

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
	var containerRight = 800;
	var containerBottom = 500;
	
	if(ballTop <= containerTop){
		
       	//checkCollison(ball, ball2);
		return ball.yspeed = Math.round(Math.random()*5)+10;
	}

	if(ballLeft <= containerLeft){
		//checkCollison(ball, ball2);
		return ball.xspeed = Math.round(Math.random()*5)+10;
	}
	

	if(ballBottom >= containerBottom){
		//checkCollison(ball, ball2);
		return ball.yspeed = -(Math.round(Math.random()*5)+10);
	}

	if(ballRight >= containerRight){
		//checkCollison(ball, ball2);
		return ball.xspeed = -(Math.round(Math.random()*5)+10);
	}

// second ball	
	if(ball2Top <= containerTop){
		
		return ball2.yspeed = Math.round(Math.random()*5)+10;
	}

	if(ball2Left <= containerLeft){
		
		return ball2.xspeed = Math.round(Math.random()*5)+10;
	}
	

	if(ball2Bottom >= containerBottom){
		
		return ball2.yspeed = -(Math.round(Math.random()*5)+10);
	}

	if(ball2Right >= containerRight){
		
		return ball2.xspeed = -(Math.round(Math.random()*5)+10);
	}
}

function smashBall(keyCodeNumber) {
   
    var LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;

    switch (keyCodeNumber) {
    case LEFT:
        
        ball2.xspeed = -15;
        ball2.yspeed = 0;
        break;
    case UP:
        ball2.xspeed = 0;
       	ball2.yspeed = -15;
        break;
    case RIGHT:
        ball2.xspeed = 15;
        ball2.yspeed = 0;
        break;
    case DOWN:
         ball2.xspeed = 0;
         ball2.yspeed = 15;
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