function GamePanel(props){
	
	this.width	= props.width || 300;
	this.height	= props.height || 500;
	this.class	= props.class;
	this.id		= props.id;
	this.$parent= props.parent;
	
	var thisPanel = this;

	// CREATING DIV
	this.$gamePanel = document.createElement("div");

	this.initGamePanel = function(){

		thisPanel.$gamePanel.style.width 	= thisPanel.width + "px";
		thisPanel.$gamePanel.style.height = thisPanel.height + "px";
		thisPanel.$gamePanel.className 	= thisPanel.class;
		thisPanel.$gamePanel.setAttribute("id",thisPanel.id);

		thisPanel.$parent.appendChild(thisPanel.$gamePanel);

		return thisPanel.$gamePanel;
	}
}