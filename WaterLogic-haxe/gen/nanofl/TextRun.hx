package nanofl;

extern class TextRun
{
	var align : String;
	var characters : String;
	var family : String;
	var fillColor : String;
	var kerning : Bool;
	var letterSpacing : Float;
	var lineSpacing : Float;
	var size : Float;
	var strokeColor : String;
	var strokeSize : Float;
	var style : String;
	
	function new(?characters:String, ?fillColor:String, ?size:Float) : Void;
	
	function clone() : nanofl.TextRun;
}