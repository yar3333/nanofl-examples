package nanofl;

extern class TextField extends createjs.Container
{
	var border(default, set) : Bool;
	var height(default, set) : Float;
	var minHeight(default, null) : Float;
	var minWidth(default, null) : Float;
	var selectable : Bool;
	var selectionEnd(null, set) : Int;
	var selectionStart(null, set) : Int;
	var text(get, set) : String;
	var textRuns : Array<TextRun>;
	var width(default, set) : Float;
	
	function new() : Void;
	function update() : Void;
}
