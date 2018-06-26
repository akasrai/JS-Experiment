
var body = document.getElementsByTagName('body')[0];
var mygraph = document.createElement('div');
mygraph.style.background = "black";
mygraph.style.width = "500px";
mygraph.style.height = "500px";
mygraph.style.position ="relative";
mygraph.style.margin = "auto";
mygraph.style.border = "15px solid gray";

body.appendChild(mygraph);

var list = document.createElement('ul');
list.style.width = "500px";
list.style.margin = "auto";
list.setAttribute("id", "deleted_star");
body.appendChild(list);

// var data = [
// 	{top:20, left:50 },
// 	{top:450, left:300},
// 	{top:100, left:400},
// 	{top:150, left:100},
// 	{top:200, left:280},
// 	{top:300, left:340},
// 	{top:400, left:390},
// ];

var coordinatesdata = generateData(10);

function generateData(num){
 	var top	 	= 0;
 	var left 	= 0;
 	var arrdata	= [];
 	
 	for(var i = 0; i < num; i++){

 		top = Math.floor(Math.random() * 490);
 		left = Math.floor(Math.random() * 490);

 		arrdata.push({top,left});
 	}

 	return arrdata;
 	
}

console.log(coordinatesdata);
	
var colors = ['red','white','blue','green','pink'];
var colorofstar = 0;		

function plotStar(){

	for(i = 0; i < coordinatesdata.length; i++){

		if( colorofstar === colors.length){
			colorofstar = 0;
		}

		var coordinates = document.createElement('div');
		coordinates.style.background = colors[colorofstar];
		coordinates.style.width = "10px";
		coordinates.style.height = "10px";
		coordinates.style.borderRadius ="100%";  // if any css element come with - then use camel case in js
		coordinates.style.position = "absolute";
		coordinates.style.top = coordinatesdata[i].top + "px";
		coordinates.style.left = coordinatesdata[i].left + "px";
		coordinates.setAttribute("id", "star-"+i);

		mygraph.appendChild(coordinates);
		
		colorofstar++;
	}

	destroyStar();
}

function destroyStar(){

	var star = [];

	for(var i = 0; i < coordinatesdata.length; i++){

		star[i] = document.getElementById("star-"+i);
		deleteStar(star[i]);
	}
}

function deleteStar(child){

	child.onclick = function(){

		mygraph.removeChild(child);

		//alert(child.style.top);
		var deleted_star = document.getElementById('deleted_star');
		var deleted_star_list = document.createElement('li');
		
		deleted_star_list.style.width = "auto";
		deleted_star_list.style.color = "black";
	
		deleted_star.appendChild(deleted_star_list);

		deleted_star_list.innerHTML = child.style.left + " * "+child.style.top;

	} 
}

plotStar();
