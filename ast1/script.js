
function animate(n){

	var count = n;

	setInterval(function(){
		for(var i = 0; i <= n; i++){

			var pat = "";
			if(i <= n/2){
				for(var j = 0; j<=i; j++){
					pat += "*";
				}
                console.log(pat);
			}else{
				for(var j = n; j>=i; j--){
					pat += "*";
				}
                console.log(pat);
			}
			
	 	}
	},200);
	 
		
}


 animate(10);

