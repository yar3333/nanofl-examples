class Scene extends base.Scene
{
	lastInitFrame : number = null;
	
	onEnterFrame()
	{
		var self = this;
		
		if (this.currentFrame != this.lastInitFrame)
		{
			this.lastInitFrame = this.currentFrame;
			this.addButtonHandler("btGotoGame", function() { self.gotoAndStop("Game"); });
			this.addButtonHandler("btRules", function() {  self.gotoAndStop("Rules"); });
			this.addButtonHandler("btScores", function() { self.gotoAndStop("Scores"); });
			this.addButtonHandler("btGotoOrigin", function() { self.gotoAndStop("Origin"); });
		}
	}
	
	addButtonHandler(name:string, f:()=>void)
	{
		var bt = this.getChildByName(name);
		if (bt != null) bt.addEventListener("click", function(e) { f(); });
	}
}