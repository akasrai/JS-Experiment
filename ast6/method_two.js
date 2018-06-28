

var ball = generateBall(50);
//var speed = 15;

function generateBall(num){
 	var top	 	= 0,
 		left 	= 0,
 		x 		= 0,
 		y 		= 0,
 		$elem 	= "",
 		radius	= 10,
 		mass	= 1,
 		dx		= 0,
 		dy		= 0,
 		speed	= 5,
 		collision = 0,
 		id 		  = 0;

 	var arrdata	= [];
 	var direction = [-1,1];
 	for(var i = 0; i < num; i++){

 		top 	= Math.floor(Math.random() * 480);
 		left 	= Math.floor(Math.random() * 750);
 		x 		= left;
 		y 		= top;
 		$elem  	= "$ball";
 		dx 		= direction[Math.floor(Math.random() * direction.length)];  //Math.round(Math.random()*5)+10;
		dy	 	= direction[Math.floor(Math.random() * direction.length)];  //Math.round(Math.random()*5)+10; 
		id 		= i+1;

 		arrdata.push({top, left, x, y, $elem, radius, mass, dx, dy, speed, collision, id});
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
	ballDetection(ball);

}

plotBall(ball,color);

setInterval(function(){
	var ballForDeletion = [];
	for (var i = 0; i < ball.length; i++) {
		
		// ball[i].x += ball[i].xspeed * speed;
		// ball[i].y += ball[i].yspeed * speed;
		ball[i].x = ball[i].x + ball[i].dx * ball[i].speed;
		ball[i].y = ball[i].y + ball[i].dy * ball[i].speed;
		
		
		// console.log(ball.length);
		//.log(ball);
			
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
		if(updateball){
			updateball.style.top = ball[i].y + "px";
			updateball.style.left = ball[i].x + "px";
		}
		

		
	}
	
}


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
			
			ball[i].top = 0; 
			ball[i].dy = 1 ;//* 15;
			// return ball[i].yspeed = Math.round(Math.random()*5)+10;
		}

		if(ballLeft <= containerLeft){
			ball[i].left = 0;
			ball[i].dx = 1;// * 15;
			//return ball[i].xspeed = Math.round(Math.random()*5)+10;
		}
		

		if(ballBottom >= containerBottom){
			
			ball[i].top = containerBottom-30;
			ball[i].dy = -1;//* 15;
			// return ball[i].yspeed = -(Math.round(Math.random()*5)+10);
		}

		if(ballRight >= containerRight){
			
			ball[i].left = containerRight-30;
			ball[i].dx = -1;// * 15;
			// return ball[i].xspeed = -(Math.round(Math.random()*5)+10);
		}
			
	}
	
}

function checkCollision(ball){

	for(var i = 0; i < ball.length; i++){

		for(var j = i+1; j < ball.length; j++ ){
			
		    var dx = ball[i].x - ball[j].x,
        		dy = ball[i].y - ball[j].y;
        	
		    var distance  = Math.sqrt(dx * dx + dy * dy);
		    var radiusSum = ball[i].radius + ball[j].radius

		    if(distance <= radiusSum){

		    	if(ball[i].collision == 0 || ball[j].collision == 0 ){

			    	//console.log(distance);
					ball[i].collision = 1;						    	
					ball[j].collision = 1;						    	
			    	collisionBounce(ball[i], ball[j]);
			    }

		   }else{

		   		// console.log(distance);
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

function collisionBounce(ball1, ball2){

	//if( distance(ball1, ball2) <= ball1.radius + ball2.radius ){
	
		ball1.x += ball1.radius*2;

		// dx = ball1.left - ball2.left;
	 //    dy = ball1.top -ball2.top;

		// collisionision_angle = Math.atan2(dy, dx);

	    dx  = Math.abs(ball1.dx);
	    dy  = Math.abs(ball1.dy);
	    dx2 = Math.abs(ball2.dx);
	    dy2 = Math.abs(ball2.dy);
	 	   
		if(ball2.dx === -1 && ball2.dy === -1){
			
			ball2.dx = dx2;
			ball2.dy = dy2;

		}else if(ball2.dx === 1 && ball2.dy === -1){
			
			ball2.dx = -dx2;
			ball2.dy =  dy2;
			
		}else if(ball2.dx === 0 && ball2.dy === -1){
			ball2.dx = 0;
			ball2.dy = dy2;

		}else if(ball2.dx === -1 && ball2.dy === 1){
			ball2.dx = dx2;
			ball2.dy = -dy2;

		}else if(ball2.dx === 1 && ball2.dy === 1){
			ball2.dx = -dx2;
			ball2.dy = -dy2;

		}else if(ball2.dx === 0 && ball2.dy === 1){
			ball2.dx = 0;
			ball2.dy = -dy2;

		}else if(ball2.dx === 1 && ball2.dy === 0){
			ball1.dx = -dx2;
			ball1.dy = 0;

		}else if(ball2.dx === -1 && ball2.dy === 0){
			ball2.dx = dx2;
			ball2.dy = 0;
		}

		if(ball1.dx === -1 && ball1.dy === -1){
		
			ball1.dx = dx;
			ball1.dy = dx;

		}else if(ball1.dx === 1 && ball1.dy === -1){
			
			ball1.dx = -dx;
			ball1.dy = dy;

		}else if(ball1.dx === 0 && ball1.dy === -1){
			ball1.dx = 0;
			ball1.dy = dy;

		}else if(ball1.dx === -1 && ball1.dy === 1){
			ball1.dx = -dx;
			ball1.dy = -dy;

		}else if(ball1.dx === 1 && ball1.dy === 1){
			ball1.dx = -dx;
			ball1.dy = -dy;

		}else if(ball1.dx === 0 && ball1.dy === 1){
			ball1.dx = 0;
			ball1.dy = -dy;

		}else if(ball1.dx === 1 && ball1.dy === 0){
			ball1.dx = -dx;
			ball1.dy = 0;

		}else if(ball1.dx === -1 && ball1.dy === 0){
			ball1.dx = dx;
			ball1.dy = 0;
		}	

	//}
}

function ballDetection(ball){

	var ballForDeletion = [];

	for(var i = 0; i < ball.length; i++){

		ballForDeletion[i] = document.getElementById("ball-"+i);
		removeBall(ballForDeletion[i], ball[i], ball);
	}
}

function removeBall(child, ballDeleted){

	child.onclick = function(){
	
		var $gamePanel = document.getElementById('gamepanel');
		$gamePanel.removeChild(child);
		// console.log(child);
		// get index of object with id:37
		var removeIndex = ball.map(function(item) { return item.id; }).indexOf(ballDeleted.id);

		// remove object
		ball.splice(removeIndex, 1);
		// console.log(ball.length);

	} 
}