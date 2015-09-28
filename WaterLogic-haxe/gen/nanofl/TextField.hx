package nanofl;

extern class TextField extends createjs.Container
{
	var border : Bool;
	var height : Float;
	var minHeight(default, never) : Float;
	var minWidth(default, never) : Float;
	var text : String;
	var textRuns : Array<nanofl.TextRun>;
	var width : Float;
	
	function new() : Void;
}