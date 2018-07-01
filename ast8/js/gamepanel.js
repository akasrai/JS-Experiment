function GamePanel(props){
	
	// FOR FRONT TRANSPARENT GAME PANEL
	this.width	= props.width || 300;
	this.height	= props.height || 500;
	this.class	= props.class;
	this.id		= props.id;
	this.$parent= props.parent;

	// FOR BACKGROUND PANEL (ITS SEPERATE DIV ALREADY CREATED USING CSS HTML)
	this.background  = props.background;
	this.$background = props.backgroundParent;
	this.scrollY	 = -1;
	this.backgroundY = 0;
	this.scrollSpeed = props.scrollSpeed || 15;
 	
	var thisPanel = this;
	var infinityBg;

	// CREATING DIV FOR GAME PANEL
	this.$gamePanel = document.createElement("div");
	this.$playButton = document.createElement("div");
	this.$controlPanel = document.createElement("div");
	this.$pauseButton = document.createElement("div");

	this.initGamePanel = function(){

		thisPanel.$gamePanel.style.width 	= thisPanel.width + "px";
		thisPanel.$gamePanel.style.height = thisPanel.height + "px";
		thisPanel.$gamePanel.className 	= thisPanel.class;
		thisPanel.$gamePanel.setAttribute("id",thisPanel.id);

		thisPanel.$parent.appendChild(thisPanel.$gamePanel);

		return thisPanel.$gamePanel;
	}

	// INFILITY LOOP FOR BACKGROUND PANEL
	this.infinityBackground = function(){

		infinityBg = setInterval(function(){

			thisPanel.$background.style.marginBottom = thisPanel.backgroundY + "px";

			// UPDATE NEW POSITION / MARGIN TOP
			updateBackgroundPosition();

			if(thisPanel.backgroundY <= - (10000 - gamePanelHeight)){

				thisPanel.backgroundY = gamePanelHeight;
			}

		},100);
		
	}

	// GIVING NEW POSITION TO BG TO SCROLL
	var updateBackgroundPosition = function(){

		thisPanel.backgroundY += thisPanel.scrollY * thisPanel.scrollSpeed;
	}


	// THIS COMES OVER THE INFINIY BG
 	this.welComePanel = function(){

		thisPanel.$gamePanel.style.background 	= "rgba(0, 194, 255, 0.43)";
		thisPanel.$gamePanel.innerHTML = "<p>We came to know that numbers of UFOS are down to earth for destruction. We believed and choosed you to protect OUR EARTH against them. </p><h1>ARE YOUR READY TO TAKE DOWN THE UFOS?</h1>";

	}

	// ADDING PLAY SETTING AND OTHER BUTTOMS
	this.addButtoms = function(){

		thisPanel.$playButton.setAttribute("id","playbutton");
		thisPanel.$playButton.className= "button-for-all";
		thisPanel.$playButton.style.margin= "50px 35%";
		thisPanel.$playButton.innerHTML = "<p>YES, LETS FIGHT</p>";
		thisPanel.$gamePanel.appendChild(thisPanel.$playButton);

		return thisPanel.$playButton;		
	}

	// RESET PANEL CONTENT TO PLAY GAMES
	this.resetGamePanel = function(){

		thisPanel.$gamePanel.removeChild(thisPanel.$playButton);
		thisPanel.$gamePanel.style.background = "transparent";
		thisPanel.$gamePanel.innerHTML = "";
	}

	// ADD CONTROL PANEL ON THE TOP OF GAME
	this.addControlPanel = function(){

		thisPanel.$controlPanel.className = "control-panel clearfix";
		thisPanel.$controlPanel.setAttribute("id","controlpanel");

		thisPanel.$parent.appendChild(thisPanel.$controlPanel);

		return thisPanel.$controlpanel;
	}

	// ADD PAUSE BUTTOM
	this.pauseButton = function(){

		thisPanel.$pauseButton.setAttribute("id","pausebutton");
		thisPanel.$pauseButton.className= "pause-buttom";
		thisPanel.$pauseButton.style.padding= "10px";
		thisPanel.$pauseButton.style.right= "50px";
		thisPanel.$pauseButton.style.top= "20px";
		thisPanel.$pauseButton.style.backgroundImage = "url(images/pause.png)";
		
		thisPanel.$controlPanel.appendChild(thisPanel.$pauseButton);

		return thisPanel.$pauseButton;
	}

	// CHANGE ICON OF PAUSE BUTTON
	this.changePauseIcon = function(icon){

		thisPanel.$pauseButton.style.backgroundImage = "url("+ icon +")";		
	}

	// GAME INFINITY BG PAUSE
	this.pauseInfinityBg = function(){

		clearInterval(infinityBg);
			
	}

}