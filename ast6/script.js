

var ball = generateBall(5);

function generateBall(num){
 	var top	 	= 0,
 		left 	= 0,
 		x 		= 0,
 		y 		= 0,
 		$elem 	= "",
 		radius	= 15,
 		mass	= 1,
 		xspeed	= 0,
 		yspeed	= 0,
 		collision = 0;

 	var arrdata	= [];
 	
 	for(var i = 0; i < num; i++){

 		top 	= Math.floor(Math.random() * 480);
 		left 	= Math.floor(Math.random() * 750);
 		x 		= left;
 		y 		= top;
 		$elem  	= "$ball";
 		xspeed 	= Math.round(Math.random()*5)+10;
		yspeed 	= Math.round(Math.random()*5)+10; 

 		arrdata.push({top, left, x, y, $elem, radius, mass, xspeed, yspeed, collision});
 	}

 	return arrdata;
 	
}

var color = ['red','white','blue','green','pink'];
var colorofball = 0;

function plotBall(ballData, colors){

	var $gamePanel = document.getElementById('gamepanel');
	var $ball ;

	for(i = 0; i < ballData.length; i++){

		if( colorofball === colors.length){
			colorofball = 0;
		}

		$ball = document.createElement('div');
		$ball.style.background 	= colors[colorofball];
		$ball.style.width 		= (ballData[i].radius * 2)+"px";
		$ball.style.height 		= (ballData[i].radius * 2)+"px";
		$ball.style.borderRadius= "100%";  // if any css element come with - then use camel case in js
		$ball.style.position 	= "absolute";
		$ball.style.top 		= ballData[i].top + "px";
		$ball.style.left 		= ballData[i].left + "px";
		$ball.setAttribute("id", "ball-"+i);

		$gamePanel.appendChild($ball);		
		colorofball++;
	}

}

plotBall(ball,color);

setInterval(function(){

	for (var i = 0; i < ball.length; i++) {
		
		ball[i].x += ball[i].xspeed;
		ball[i].y += ball[i].yspeed;

	}
	
	updateBall(ball);
	checkCollision(ball);
	checkBoundryCollision(ball);
	// checkCollison(ball, ball2);
},100);

function updateBall(ball){
	var updateball;
	for (var i = 0; i < ball.length; i++) {

		updateball = document.getElementById("ball-"+i)
		updateball.style.top = ball[i].y + "px";
		updateball.style.left = ball[i].x + "px";
	}
}
console.log(ball[0].$elem);

function checkBoundryCollision(ball){

	var ballLeft = ball.x;
	var ballRight = ballLeft;
	var ballTop = ball.y;
	var ballBottom = ballTop;
	
	var containerTop = 0;
	var containerLeft = 0;
	var containerRight = 775;
	var containerBottom = 475;
	for (var i = 0; i < ball.length; i++) {
		
		ballLeft = ball[i].x;
		ballRight = ballLeft;
		ballTop = ball[i].y;
		ballBottom = ballTop;


		if(ballTop <= containerTop){
		
			ball[i].top = 0;ball[i].yspeed *= -1;
			// return ball[i].yspeed = Math.round(Math.random()*5)+10;
		}

		if(ballLeft <= containerLeft){
			ball[i].left = 0; ball[i].xspeed *= -1;
			//return ball[i].xspeed = Math.round(Math.random()*5)+10;
		}
		

		if(ballBottom >= containerBottom){
			
			ball[i].top = innerHeight-30;ball[i].yspeed *= -1;
			// return ball[i].yspeed = -(Math.round(Math.random()*5)+10);
		}

		if(ballRight >= containerRight){
			
			ball[i].left = window.innerWidth-30;ball[i].xspeed *= -1;
			// return ball[i].xspeed = -(Math.round(Math.random()*5)+10);
		}
			
	}
	
}

function checkCollision(ball){

	for(var i = 0; i < ball.length; i++){

		for(var j = i+1; j < ball.length; j++ ){
			var dx = Math.abs(ball[i].left - ball[j].left);
		        dy = Math.abs(ball[i].top - ball[j].top);
		    
		    var distance  = Math.sqrt(dx * dx + dy * dy);
		    var radiusSum = ball[i].radius + ball[j].radius

		    if(distance <= radiusSum) {
			    if(ball[i].collision == 0 || ball[j].collision == 0 ){

					ball[i].collision = 1;						    	
					ball[j].collision = 1;						    	
			    	collisionBounce(ball[i], ball[j]);
			    }

		   }else{

				ball[i].collision = 0;						    	
				ball[j].collision = 0;		   	
		   }
		}
	}

}
function distance(ball1, ball2 ){
	var dx = ball1.left - ball2.left,
        dy = ball1.top - ball2.top;
        return Math.sqrt(dx * dx + dy * dy);
}

function collisionBounce(ball, ball2){

	//if( distance(ball, ball2) <= ball.radius + ball2.radius ){
	
		dx = ball.left - ball2.left;
	    dy = ball.top -ball2.top;

	    // console.log(ball);
	    // console.log(ball2);
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

	    ball.xspeed = Math.cos(collisionision_angle)*final_xspeed_1+Math.cos(collisionision_angle+Math.PI/2)*final_xspeed_1;
	    ball.yspeed = Math.sin(collisionision_angle)*final_yspeed_1+Math.sin(collisionision_angle+Math.PI/2)*final_yspeed_1;

	    ball2.xspeed = Math.cos(collisionision_angle)*final_xspeed_2+Math.cos(collisionision_angle+Math.PI/2)*final_xspeed_2;
    	ball2.yspeed = Math.sin(collisionision_angle)*final_yspeed_2+Math.sin(collisionision_angle+Math.PI/2)*final_yspeed_2;
	    
	 //    console.log(ball.xspeed);
		// console.log(ball.yspeed);

//	}
}