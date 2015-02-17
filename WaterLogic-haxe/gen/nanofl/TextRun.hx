package nanofl;

extern class TextRun
{
	var align : String;
	var characters : String;
	var family : String;
	var fillColor : String;
	var size : Float;
	var strokeColor : String;
	var strokeSize : Float;
	var style : String;
	
	function new(characters:String, fillColor:String, family:String, style:String, size:Float, align:String, strokeSize:Float, strokeColor:String) : Void;
	function clone() : TextRun;
}
