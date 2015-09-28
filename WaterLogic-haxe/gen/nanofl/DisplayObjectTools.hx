package nanofl;

extern class DisplayObjectTools
{
	static function cache(obj:createjs.DisplayObject) : Void;
	static function uncache(obj:createjs.DisplayObject) : Void;
	static function getBounds(obj:createjs.DisplayObject, ?ignoreSelf:Bool) : createjs.Rectangle;
}