import js.Browser.document;
import js.html.DivElement;
import js.three.Object3D;

class Scene extends base.Scene
{
	var sphere : Object3D;
	var fpsDiv : DivElement;
	
	function init()
	{
		//nanofl.Player.stage.canvas.style.display = "none";
		createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
		
		sphere = childByName.myEarth.object.childByName.Sphere;
		
		fpsDiv = cast document.body.appendChild(document.createDivElement());
		fpsDiv.style.position = "absolute";
		fpsDiv.style.top = "0";
		fpsDiv.style.left = "0";
		fpsDiv.style.fontSize = "14px";
	}
	
	override function onEnterFrame()
	{
		sphere.rotateX(0.010);
		sphere.rotateY(0.015);
		sphere.rotateZ(0.020);
		
		fpsDiv.innerHTML = (Std.is(childByName.myEarth.renderer, js.three.WebGLRenderer) ? "WebGL" : "Canvas")
							 + ": " + Std.string(Math.round(createjs.Ticker.getMeasuredFPS()));
	}
}