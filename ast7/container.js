
function Container(props){

	this.width	= props.width || 0;
	this.height	= props.height || 0;
	this.class	= props.classname || 0;
	this.id		= props.id || 0;

	this.$container = document.createElement("div");
	// CREATES GAME PANEL
	this.initContainer = function(){
		this.$container.className 	 = this.class;
		this.$container.style.width  = this.width + "px";
		this.$container.style.height = this.height + "px";
		this.$container.setAttribute("id", this.id);

		document.body.appendChild(this.$container);

		return this.$container;
	}

	// SCORE BOARD DIV
	this.gameScoreBoard = function(){

		var $gamepanel = document.getElementById("gamepanel");
		this.$scoreboard = document.createElement("div");

		this.$scoreboard.className 	 = this.class;
		this.$scoreboard.style.width  = this.width + "%";
		this.$scoreboard.style.height = this.height + "%";
		this.$scoreboard.setAttribute("id", this.id);
		
		$gamepanel.appendChild(this.$scoreboard);

		this.$scoreboard.innerHTML = "<p>YOU SCORE IS<p><h1>"+score+"</h1>";
	}
}

