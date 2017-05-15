import js.three.Object3D;
import js.three.Vector3;
import nanofl.ThreeView;

class Scene extends base.Scene
{
	var sphere : Object3D;
	
	function init()
	{
		var myEarth : ThreeView = cast this.getChildByName("myEarth");
		sphere = myEarth.object.getChildByName("Sphere");
	}
	
	override function onEnterFrame()
	{
		sphere.rotateX(0.010);
		sphere.rotateY(0.015);
		sphere.rotateZ(0.020);
	}
}