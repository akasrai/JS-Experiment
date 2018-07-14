'use strict';

class Game{

	constructor(){
		this.obstacles = [];
		this.obstacleCount = 0;
		this.topOrBottom = [1,-1];
		this.score = 0;
	}

	// FUNCTION TO CREATE OBSTACLES
	createObstcles(){
	
		let positionY = 1;
		let heightOfObstacle = Math.floor(Math.random() * (240 - 80)) + 80;

		for(let i = 0; i < 2; i++){
			
			this.obstacles[this.obstacleCount] = new Obstacle({
	
				width	: 60,
				height  : (positionY ===1) ? heightOfObstacle : (Math.floor(Math.random() * (330 - 280)) + 280) - heightOfObstacle,
				class	: "obstacles",
				posY	: positionY,
				posX	: panelWidth,
				background : "images/pipe-green.png",
				parent	   : $bgPanel
			});
	
			this.obstacles[this.obstacleCount].initObstacle();
			this.obstacleCount++;
			positionY = -1;
			//this.topOrBottom[Math.floor(Math.random() * this.topOrBottom.length)]
		}
	}	

	// MOVE OBSTACLE BY INVOKING FUNCTION IN OBSTACLE CLASS
	moveObstacles(){

		

		this.obstacles.forEach(function(obstacle){

			obstacle.moveObstacle();

			if(typeof obstacle !== "undefined"){
				// IF IT CROSSES -70 IN x POSITION DESTRY IT
				if(obstacle.posX <= -100){

					// DESTROY OBJECT FROM ARRAY
					// let removIindex = this.obstacles.indexOf(this.obstacle);
					// this.obstacles.splice(removIindex,1);

					// console.log(obstacle.posX)
					this.obstacles.shift();
					obstacle.destroyObstacle();
					// console.log(this.obstacles);
				}
			}
			return this.obstacles;

		// BIND this TO ACCESS this OBJECT IN SUCH FUNCTION OR ASSIGN THIS TO NEW VARIABLE
		}.bind(this));

	}

	// CHECK IF BIRD HITS OBSTACLES
	checkObstacleCollision(bird, gamePanel){

		let returnvalue = 1;

		this.obstacles.forEach(function(obstacle){
			
			let birdXright  = bird.left + bird.width - bird.speed,
				birdXleft 	= bird.left - (bird.width + bird.speed),

				birdY   	= bird.top + (bird.height - bird.speed),
				obstacleY	= panelHeight - obstacle.height -112;

			if(obstacle.posX <= birdXright && obstacle.posX >= birdXleft){

				if((birdY > obstacleY && obstacle.posY === 1) || (obstacle.height >= (bird.top-bird.speed) && obstacle.posY === -1)){
					
					bird.destroyBird();
					returnvalue = 0;
					let end = new GameSound("sound/end.mp3");
						end.play();
				
				}else{
					
					if( (obstacle.posX + obstacle.width < bird.left + (obstacle.speed * 2)) && obstacle.passed === 0){

						this.score += 1;
						obstacle.passed = 1;
						// SHOW SCORE IN PANEL
						gamePanel.showScore(this.score);

					}
				}
			}

		}.bind(this));

		return returnvalue;
	}

	// DESTROY ALL OBSTACLES
	resetObstacles(){

		this.obstacles.forEach(function(obstacle){

			obstacle.destroyObstacle();

		}.bind(this));

		this.obstacles = [];
		return 1;
	}

	// RESET SCORE
	resetScore(){

		this.score = 0;
	}
}
