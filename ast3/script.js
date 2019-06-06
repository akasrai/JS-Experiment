
var slider = document.getElementById("myslider");
var left = document.getElementById("left");
var right = document.getElementById("right");
var marginleft = 0;
var slides = 5;
var counter = 0;


var sliderindicator = document.getElementById("sliderbarwrapper");

//------------------------- slider idicators at bottom ------------

function createIndicator(){
	for(var i = 0; i < slides; i++){
		var sliderbar = document.createElement('div');
		sliderbar.style.background = "transparent";
		sliderbar.style.border = "3px solid white";
		sliderbar.style.width = "8px";
		sliderbar.style.height = "8px";
		sliderbar.style.borderRadius ="100%";  // if any css element come with - then use camel case in js
		sliderbar.style.position = "absolute";
		sliderbar.style.top = "0";
		sliderbar.style.left = i*20 +"px";

		sliderbar.setAttribute("id", "sliderbar-"+i);
		sliderbar.setAttribute("class", "sliderbar");

		sliderindicator.appendChild(sliderbar);
	}
	initialImage = document.getElementById("sliderbar-0");
	initialImage.style.background = "white";
}
createIndicator();


//---------------------- auto sliding slider---------------
// setInterval(function(){

	
//  	slider.style.marginLeft = "-"+ marginleft + "px";

//  	var currentposition = marginleft / 1100; //(marginleft / 1100 == 0)  ? marginleft / 1100 + slides + 1 : marginleft / 1100;
	
//  	sliderIndicator(currentposition);	
	
// 	if((slides * 1100) === marginleft){
//  		marginleft = 0; 
//  		//increment = 0;
//  	}else{
//  		marginleft += 100;
		
//  	}

// },100);


right.onclick = function(){

	var animateright = setInterval(function(){

		if(counter === 1100){
			counter = 0;
			
			clearInterval(animateright);
			var currentposition = marginleft / (-1100);
			// console.log(currentposition);
			sliderIndicator(currentposition);

		}else if(marginleft < (slides * (-1100))){
			
			marginleft = -50;
		
		}else{
			counter +=50;
			marginleft -= 50;
		}

		slider.style.marginLeft =  marginleft + "px";
		
		// console.log(marginleft);
		

	},100);

}

left.onclick = function(){
	
	var animateleft = setInterval(function(){

		if(counter === 1100){
			counter = 0;
			var currentposition = marginleft / (-1100); 
			console.log(currentposition);
			sliderIndicator(currentposition);

			clearInterval(animateleft);

		}else if(marginleft === 0){

			marginleft = slides * (-1100);

		}else{
			marginleft += 50;
			counter +=50;
		}
		slider.style.marginLeft =  marginleft + "px";
		
		//console.log(marginleft);
		
	},100);
	
	
	
	
}

function sliderIndicator(current){

	// indicator_class = document.getElementsByClassName("sliderbar");
	// indicator_class.style.background = "transparent";

	// indicator_id = document.getElementById("sliderbar-"+current);
	// indicator_id.style.background = "white";

	for( var i = 0; i< slides; i++){
		
		if(i === current){
			indicator = document.getElementById("sliderbar-"+current);
			indicator.style.background = "white";
		}else{
			indicator = document.getElementById("sliderbar-"+i);
			indicator.style.background = "transparent";	

			if(current === slides){
				indicator = document.getElementById("sliderbar-"+0);
				indicator.style.background = "white";	
			}
		}
	}
	
}
