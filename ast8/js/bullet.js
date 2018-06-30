
function Bullet(props){

	this.width	= props.width || 30;
 	this.height	= props.height || 30;
 	this.class  = props.class || "bullet";
 	this.id 	= props.id || "bullet";
 	this.$parent = props.parent;
 	this.background = props.background || "yellow";
 	this.speed 		= props.speed || 15;
 	this.dy 		= 1;
 	this.x 			= props.left;
 	this.y 			= props.bottom;
 	this.parentHeight = props.parentHeight;
 	this.parentWidth  = props.parentWidth;
 	this.$parentOfParent = props.parentOfParent;
 	this.parentX = props.parentX;

 	var bulletThis = this;

 	this.$bullet = document.createElement("div");

 	this.initBullet = function(){

 		bulletThis.$bullet.style.width 		= bulletThis.width + "px";
 		bulletThis.$bullet.style.height 	= bulletThis.height + "px";
 		bulletThis.$bullet.style.background = bulletThis.background;
 		bulletThis.$bullet.setAttribute("id", bulletThis.id);
 		bulletThis.$bullet.className		= bulletThis.class;
 		bulletThis.$bullet.style.left 	= bulletThis.x + "px";
 		bulletThis.$bullet.style.bottom	= bulletThis.y + "px";

 		// BULLET APPENDED TO SHOOTER OBJ SO THAT IT LOOKS LIKE BULLET COMING OUT FROM SHOOTER
 		bulletThis.$parent.appendChild(bulletThis.$bullet);

 		fireBullet();
 		return bulletThis.$bullet;
 	}

 	var updateBulletPosition = function(){

 		// ADDING SHOOTERS X POSITION TO MAKE IT FLY ON SAME POSITION OF SHOOTERS PARENT
 		bulletThis.$bullet.style.left 	= bulletThis.x + bulletThis.parentX + "px";
 		bulletThis.$bullet.style.bottom	= bulletThis.y + "px";
 		bulletThis.y += bulletThis.dy * bulletThis.speed;

 		// BULLET IS APPENDED NOW TO THE SHOOTERS PARENT SO IT INDEPENDENT FORM SHOOTER
 		bulletThis.$parentOfParent.appendChild(bulletThis.$bullet);
 	}

 	var fireBullet = function(){

 		var firedBullet = setInterval(function(){

 			updateBulletPosition();

 			if(bulletThis.y > (bulletThis.parentHeight + 100)){
 				//alert("stopped");
 				clearInterval(firedBullet);
 			
 				return false;
 			}

 		},10)
 		
 	}
}