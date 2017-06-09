import js.Browser.document;

class Scene extends base.Scene
{
	function init()
	{
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		
		childByName.txtRenderer.text = Std.is(childByName.myEarth.renderer, js.three.WebGLRenderer) ? "WebGL" : "Canvas";
		childByName.txtRenderer.textRuns[0].family = "Times";
	}
	
	override function onEnterFrame()
	{
		var sphere = childByName.myEarth.object.childByName.Sphere;
		
		sphere.rotateX(0.010);
		sphere.rotateY(0.015);
		sphere.rotateZ(0.020);
		
		childByName.txtFPS.text = Std.string(Math.round(createjs.Ticker.getMeasuredFPS()));
	}
}