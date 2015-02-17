package nanofl;

extern class MovieClip extends createjs.Container
{
	var paused : Bool;
	var loop : Bool;
	
	var currentFrame(default, null) : Int;
	
	function new(symbol:Dynamic) : Void;
	
	function play() : Void;
	function stop() : Void;
	function gotoAndStop(labelOrIndex:Dynamic) : Void;
	function gotoAndPlay(labelOrIndex:Dynamic) : Void;
	function getTotalFrames() : Int;
	
	function onEnterFrame() : Void;
	function onMouseDown(e:createjs.MouseEvent) : Void;
	function onMouseMove(e:createjs.MouseEvent) : Void;
	function onMouseUp(e:createjs.MouseEvent) : Void;
}